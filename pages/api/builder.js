// pages/api/builder.js
import { requireAuth } from '../../lib/authMiddleware';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = await requireAuth(req, res);
  if (!user) return;

  const { niche, task, pain } = req.body;
  if (!niche || !task || !pain) return res.status(400).json({ error: 'Missing niche, task, or pain fields' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'AI service not configured.' });

  const prompt = `You are a SaaS product advisor. A developer wants to build an AI tool for: ${niche}. The tool generates: ${task}. Their users biggest pain point: ${pain}.

Give them exactly:

1. SYSTEM PROMPT
Write the exact system prompt they should paste into their AI tool config. 2-3 sentences. Specific and practical, not generic.

2. PRICING TIERS
Three tiers with name, price per month, and what is included. Simple and realistic.

3. ACQUISITION
Top 3 specific channels to find these exact customers. Name the subreddit, Facebook group, community, or outreach method. No generic advice.

Format with those 3 numbered headers. Be direct and actionable.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
        }),
      }
    );
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.status(500).json({ error: 'No response from AI.' });
    return res.status(200).json({ result: text });
  } catch (err) {
    return res.status(500).json({ error: 'AI request failed: ' + err.message });
  }
}
