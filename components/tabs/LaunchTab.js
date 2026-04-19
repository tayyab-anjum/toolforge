// components/tabs/LaunchTab.js
import { useState } from 'react';

const DAYS = [
  { day: 'Day 1', tasks: [
    { t: 'Buy domain on Namecheap (.me free with GitHub Student Pack)', s: 'Redeem at education.github.com/pack' },
    { t: 'Create GitHub repo (private) and push all project files', s: 'git init → git add . → git commit → git push' },
    { t: 'Deploy to Vercel — import repo and add all env variables', s: 'vercel.com → New Project → import from GitHub' },
    { t: 'Set up MongoDB Atlas free cluster and whitelist 0.0.0.0/0', s: 'mongodb.com/atlas → free M0 tier → Network Access → Allow all' },
  ]},
  { day: 'Day 2', tasks: [
    { t: 'Create 3 Stripe products: Starter $9, Pro $29, Agency $99', s: 'All recurring monthly. Copy each Price ID.' },
    { t: 'Add Stripe webhook endpoint in Stripe dashboard', s: 'yourapp.vercel.app/api/stripe/webhook — 3 events' },
    { t: 'Add all environment variables to Vercel and redeploy', s: 'Settings → Environment Variables → add every key' },
    { t: 'Test the full signup → checkout flow with card 4242 4242 4242 4242', s: 'Use Stripe test mode first' },
  ]},
  { day: 'Day 3', tasks: [
    { t: 'Generate 5 real example outputs for each of the 6 tools', s: 'Use your own product/brand. These become your social proof.' },
    { t: 'Record a 60-second Loom screen recording of the tool working', s: 'loom.com — free. Show input → click generate → output. No voiceover needed.' },
    { t: 'Write your landing page headline and subheadline', s: 'Formula: "Do [X] in seconds with AI. No [pain point]."' },
  ]},
  { day: 'Day 4', tasks: [
    { t: 'Connect your custom domain in Vercel', s: 'Settings → Domains → add toolforge.me → update Namecheap nameservers' },
    { t: 'Update NEXT_PUBLIC_APP_URL to your real domain and redeploy', s: 'Vercel env vars → change from .vercel.app to your domain' },
    { t: 'Set up your Loom recording as a homepage video or GIF', s: 'Convert to GIF at ezgif.com if needed' },
  ]},
  { day: 'Day 5', tasks: [
    { t: 'Post on r/SideProject — show your journey, not just the product', s: '"Built an AI copywriting tool in a weekend — here is what happened"' },
    { t: 'Post on r/entrepreneur with the same story angle', s: 'Focus on the process and revenue math. Builders love that.' },
    { t: 'Tweet a thread with your demo GIF', s: 'End with: "First 50 users get Pro free — reply YES"' },
  ]},
  { day: 'Day 6', tasks: [
    { t: 'Submit to IndieHackers.com in #show-ih', s: 'Include your MRR goal. The community loves ambitious targets.' },
    { t: 'Submit to BetaList.com', s: 'betalist.com — gets you early adopters quickly. Free listing.' },
    { t: 'DM 20 potential customers on LinkedIn or Twitter', s: 'Shopify sellers, marketing agency owners, freelance copywriters. 3-line personalized message, no pitch.' },
  ]},
  { day: 'Day 7', tasks: [
    { t: 'Launch on Product Hunt — schedule for Tuesday 12:01am PST', s: 'producthunt.com — prep 5 friends to upvote at the same time' },
    { t: 'Email anyone who signed up during the week with a launch discount', s: '20% off first month. Creates urgency.' },
    { t: 'Post a revenue update thread 24 hours after launch', s: 'Even $0 is relatable. Builders love honest updates.' },
  ]},
];

const STACK = [
  { cat: 'Frontend + backend', name: 'Next.js 14', free: 'Free on Vercel' },
  { cat: 'Hosting', name: 'Vercel', free: 'Free hobby tier' },
  { cat: 'Database', name: 'MongoDB Atlas', free: 'Free M0 tier' },
  { cat: 'Payments', name: 'Stripe', free: '% per transaction only' },
  { cat: 'AI engine', name: 'Gemini Flash', free: '1,500 req/day free' },
  { cat: 'Domain', name: 'Namecheap .me', free: 'Free 1yr (Student Pack)' },
  { cat: 'Error tracking', name: 'Sentry', free: 'Free tier (Student Pack)' },
  { cat: 'Auth', name: 'JWT (built-in)', free: 'No extra cost' },
  { cat: 'Styling', name: 'Tailwind CSS', free: 'Free' },
];

const POST_IDEAS = [
  { platform: 'r/SideProject', tip: 'Post your story: "I built an AI copywriting tool this weekend." Be honest about numbers. Best on Monday morning.' },
  { platform: 'r/entrepreneur', tip: 'Frame it as a journey post. Share the revenue math. "Here\'s how I calculated I can hit $1k MRR in 90 days."' },
  { platform: 'Twitter/X', tip: 'Thread: problem → your solution → demo GIF → "First 50 users get Pro free. RT to enter." Pin it to your profile.' },
  { platform: 'IndieHackers', tip: 'Post in #show-ih. Mention your MRR goal. The IH community actively upvotes ambitious SaaS launches.' },
  { platform: 'LinkedIn', tip: 'DM 20-30 marketing agency owners or Shopify store owners directly. Personalized 3 lines. No pitch. Just ask for feedback.' },
  { platform: 'Product Hunt', tip: 'Tuesday 12:01am PST. Prep 5+ supporters to upvote at launch. Add a clear tagline: "6 AI copywriting tools in one dashboard."' },
];

export default function LaunchTab() {
  const [checked, setChecked] = useState({});

  function toggle(key) {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const totalTasks = DAYS.reduce((sum, d) => sum + d.tasks.length, 0);
  const doneTasks = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneTasks / totalTasks) * 100);

  return (
    <div>
      {/* Progress */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>7-day launch checklist</h2>
          <span style={{ fontSize: 13, color: '#1D9E75', fontWeight: 600 }}>{doneTasks}/{totalTasks} done</span>
        </div>
        <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: '#1D9E75', borderRadius: 3, transition: 'width 0.4s' }} />
        </div>
      </div>

      {/* Checklist */}
      <div style={{ marginBottom: 48 }}>
        {DAYS.map((day, di) => (
          <div key={di} className="glass" style={{ padding: 22, marginBottom: 12 }}>
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#0F6E56',
              background: '#E1F5EE', padding: '3px 10px', borderRadius: 20, marginBottom: 14,
              letterSpacing: '0.3px',
            }}>{day.day}</div>
            {day.tasks.map((task, ti) => {
              const key = `d${di}t${ti}`;
              const done = !!checked[key];
              return (
                <div key={ti} onClick={() => toggle(key)} style={{
                  display: 'flex', gap: 12, padding: '9px 0',
                  borderBottom: ti < day.tasks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  cursor: 'pointer', alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    border: done ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                    background: done ? '#1D9E75' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>
                    {done && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, color: done ? 'rgba(255,255,255,0.35)' : '#fff', textDecoration: done ? 'line-through' : 'none', lineHeight: 1.5 }}>{task.t}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{task.s}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Where to post */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 6 }}>Where to post</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Best channels for your first 50 users.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {POST_IDEAS.map((p, i) => (
            <div key={i} className="glass" style={{ padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1D9E75', marginBottom: 8 }}>{p.platform}</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{p.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 6 }}>Your full tech stack</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Everything you need to run ToolForge AI — total monthly cost near $0 to start.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {STACK.map((s, i) => (
            <div key={i} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 3 }}>{s.cat}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: '#1D9E75' }}>{s.free}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
