// pages/api/generate.js
import { requireAuth } from '../../lib/authMiddleware';

const PROMPTS = {
  ad: (f) => `Write 3 Facebook/Instagram ad variations for "${f.product}". Target audience: ${f.audience}. Tone: ${f.tone}. For each ad write: a headline, primary text (2-3 sentences), and a CTA. Make them scroll-stopping and conversion-focused. Number each variation clearly.`,
  email: (f) => `Write a cold outreach email from ${f.sender} to ${f.prospect}. Offer: ${f.offer}. Keep it under 100 words. No fluff, no "I hope this email finds you well." Lead with their pain point. End with a soft CTA. Sound human, not templated.`,
  seo: (f) => `Write an SEO meta title and meta description for a page about: ${f.page}. Target keyword: "${f.keyword}". Brand: ${f.brand}. Title: max 60 characters, keyword near start. Description: 140-155 characters, include keyword, clear value prop, soft CTA.\nTitle: ...\nDescription: ...`,
  product: (f) => `Write a compelling product description for "${f.pname}". Features: ${f.features}. Target buyer: ${f.buyer}. Include: 1 punchy opening line, 3-4 benefit-focused sentences, sensory and emotional language. Under 120 words. No bullet points, flowing prose.`,
  linkedin: (f) => `Write a LinkedIn About section for a ${f.role} with ${f.exp} experience. Top achievement: ${f.achieve}. First-person, conversational. Open with a hook (not "I am a..."). 3-4 short paragraphs. End with what you are open to. Max 220 words.`,
  review: (f) => `Write a professional warm reply to this customer review for ${f.biz}: "${f.review}". Sentiment: ${f.sentiment}. Under 80 words. Acknowledge specifically what they said. If negative: apologize genuinely, offer resolution. If positive: thank warmly, invite back. Sound human.`,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = await requireAuth(req, res);
  if (!user) return;

  const { toolId, fields } = req.body;
  if (!toolId || !fields) return res.status(400).json({ error: 'Missing toolId or fields' });

  const promptFn = PROMPTS[toolId];
  if (!promptFn) return res.status(400).json({ error: 'Unknown tool: ' + toolId });

  const limit = user.subscriptionPlan === 'agency' ? Infinity : (user.creditsLimit || 10);
  if (user.creditsUsed >= limit) {
    return res.status(403).json({ error: 'You have used all your credits. Please upgrade your plan.' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'AI service not configured. Contact support.' });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL,
        'X-Title': 'ToolForge AI',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [{ role: 'user', content: promptFn(fields) }],
        max_tokens: 800,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const text = data.choices?.[0]?.message?.content;
    if (!text) return res.status(500).json({ error: 'No response from AI. Please try again.' });

    await user.updateOne({ $inc: { creditsUsed: 1 } });

    return res.status(200).json({
      result: text,
      creditsUsed: user.creditsUsed + 1,
      creditsLimit: user.creditsLimit,
    });
  } catch (err) {
    return res.status(500).json({ error: 'AI request failed: ' + err.message });
  }
}
