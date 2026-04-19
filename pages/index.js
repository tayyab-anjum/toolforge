// pages/index.js — Landing page
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const TOOLS = [
  { icon: '◈', name: 'Ad Copy', desc: 'Facebook & Instagram ads that convert' },
  { icon: '✉', name: 'Cold Email', desc: 'Outreach that gets replies' },
  { icon: '◎', name: 'SEO Metas', desc: 'Titles & descriptions that rank' },
  { icon: '⬡', name: 'Product Descriptions', desc: 'Copy that sells on any store' },
  { icon: '◉', name: 'LinkedIn Bio', desc: 'Profiles that attract opportunities' },
  { icon: '◷', name: 'Review Replies', desc: 'Professional responses in seconds' },
];

const TESTIMONIALS = [
  { name: 'Sara K.', role: 'Shopify store owner', text: 'I used to spend 2 hours writing product descriptions. Now it takes 10 minutes for my whole catalog.' },
  { name: 'James M.', role: 'Marketing agency', text: 'We run 12 client accounts. The ad copy tool alone saves us 8 hours a week.' },
  { name: 'Priya N.', role: 'Freelance copywriter', text: 'I use ToolForge as a first draft engine. My output tripled without sacrificing quality.' },
];

export default function Landing() {
  return (
    <>
      <Head>
        <title>ToolForge AI — AI copywriting tools for marketers</title>
        <meta name="description" content="6 AI-powered tools to write ad copy, cold emails, SEO metas, product descriptions, LinkedIn bios, and review replies. Free to start." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <main>
        {/* Hero */}
        <section style={{ padding: '100px 24px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(29,158,117,0.1)', border: '1px solid rgba(29,158,117,0.25)',
            borderRadius: 20, padding: '6px 14px', marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1D9E75', animation: 'pulse-teal 2s infinite' }} />
            <span style={{ fontSize: 13, color: '#1D9E75', fontWeight: 500 }}>6 AI tools — free to start</span>
          </div>

          <h1 className="fade-up-1" style={{
            fontSize: 'clamp(38px, 6vw, 64px)',
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-1.5px', marginBottom: 20, color: '#fff',
          }}>
            Write copy 10x faster<br />
            <span className="gradient-text">with AI that actually works</span>
          </h1>

          <p className="fade-up-2" style={{
            fontSize: 18, color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.6, marginBottom: 40, maxWidth: 560, margin: '0 auto 40px',
          }}>
            6 professional AI tools for ad copy, cold emails, SEO, product descriptions, LinkedIn bios, and review replies. Built for marketers who are tired of staring at a blank page.
          </p>

          <div className="fade-up-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
                Start for free — no card needed
              </button>
            </Link>
            <Link href="/app" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ fontSize: 16, padding: '14px 28px' }}>
                See the tools →
              </button>
            </Link>
          </div>

          <p className="fade-up-4" style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>
            Free plan includes 10 generations. No credit card required.
          </p>
        </section>

        {/* Tools grid */}
        <section style={{ padding: '60px 24px', maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 12, color: '#fff' }}>
            Everything you need to write faster
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', marginBottom: 48, fontSize: 16 }}>
            Pick a tool, fill in a few details, hit generate. That&apos;s it.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {TOOLS.map((tool, i) => (
              <div key={i} className="glass" style={{ padding: '24px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(29,158,117,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <div style={{ fontSize: 24, marginBottom: 12, color: '#1D9E75' }}>{tool.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{tool.name}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Builder callout */}
        <section style={{ padding: '40px 24px', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            background: 'rgba(29,158,117,0.06)',
            border: '1px solid rgba(29,158,117,0.2)',
            borderRadius: 20, padding: '40px 40px',
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1D9E75', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>BUILDER TAB</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Need a custom tool for your niche?</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                Real estate listings. Legal summaries. Job descriptions. Describe your niche and the AI builds you a custom tool with a system prompt, pricing tiers, and acquisition strategy.
              </p>
            </div>
            <Link href="/app?tab=builder" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Try the Builder</button>
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: '60px 24px', maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 40, color: '#fff' }}>
            Marketers love it
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass" style={{ padding: 24 }}>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 16, fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: '#1D9E75',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing preview */}
        <section style={{ padding: '60px 24px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 12, color: '#fff' }}>Simple pricing</h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', marginBottom: 48, fontSize: 15 }}>
            Start free. Upgrade when you&apos;re ready.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { name: 'Free', price: '$0', desc: '10 generations to try every tool', cta: 'Start free', href: '/signup', highlight: false },
              { name: 'Starter', price: '$9/mo', desc: '100 generations/month — perfect for solo creators', cta: 'Get Starter', href: '/signup?plan=starter', highlight: false },
              { name: 'Pro', price: '$29/mo', desc: '500 generations/month — for serious marketers', cta: 'Get Pro', href: '/signup?plan=pro', highlight: true },
              { name: 'Agency', price: '$99/mo', desc: 'Unlimited — for teams and agencies', cta: 'Get Agency', href: '/signup?plan=agency', highlight: false },
            ].map((p, i) => (
              <div key={i} style={{
                background: p.highlight ? 'rgba(29,158,117,0.08)' : 'rgba(255,255,255,0.03)',
                border: p.highlight ? '2px solid rgba(29,158,117,0.4)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16, padding: 24, textAlign: 'center',
              }}>
                {p.highlight && <div style={{ fontSize: 11, fontWeight: 700, color: '#1D9E75', letterSpacing: '1px', marginBottom: 10 }}>MOST POPULAR</div>}
                <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: p.highlight ? '#1D9E75' : '#fff', marginBottom: 10 }}>{p.price}</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginBottom: 20 }}>{p.desc}</p>
                <Link href={p.href} style={{ textDecoration: 'none' }}>
                  <button className={p.highlight ? 'btn-primary' : 'btn-ghost'} style={{ width: '100%' }}>{p.cta}</button>
                </Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 24 }}>
            <Link href="/pricing" style={{ color: '#1D9E75', fontSize: 14, textDecoration: 'none' }}>
              See full pricing details and compare plans →
            </Link>
          </p>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Ready to write faster?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, marginBottom: 32 }}>
            Join marketers who stopped staring at blank pages.
          </p>
          <Link href="/signup" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}>
              Start for free — no card needed
            </button>
          </Link>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '32px 24px',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.25)',
          fontSize: 13,
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span>© 2025 ToolForge AI</span>
            <div style={{ display: 'flex', gap: 24 }}>
              <Link href="/pricing" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/login" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Login</Link>
              <Link href="/signup" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Sign up</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
