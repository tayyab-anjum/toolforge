// pages/pricing.js
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'Try every tool before committing.',
    features: ['10 AI generations total', 'All 6 copywriting tools', 'Custom tool builder', 'No credit card required'],
    cta: 'Start for free',
    href: '/signup',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$9',
    period: '/mo',
    desc: 'For solo creators and freelancers.',
    features: ['100 generations/month', 'All 6 copywriting tools', 'Custom tool builder', 'Revenue calculator', 'Email support'],
    cta: 'Get Starter',
    href: '/signup?plan=starter',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    desc: 'For serious marketers who ship daily.',
    features: ['500 generations/month', 'All 6 copywriting tools', 'Custom tool builder', 'Priority support', 'Revenue calculator', 'Launch checklist'],
    cta: 'Get Pro',
    href: '/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Agency',
    price: '$99',
    period: '/mo',
    desc: 'For teams managing multiple clients.',
    features: ['Unlimited generations', 'All 6 copywriting tools', 'Custom tool builder', 'Priority support', 'Revenue calculator', 'Launch checklist', 'Team access (coming soon)'],
    cta: 'Get Agency',
    href: '/signup?plan=agency',
    popular: false,
  },
];

const FAQ = [
  { q: 'What counts as one generation?', a: 'Each time you click "Generate" and get output from any tool, that counts as one generation.' },
  { q: 'Can I upgrade or downgrade anytime?', a: 'Yes. Your plan changes immediately. If you upgrade mid-cycle you are charged the prorated difference. If you downgrade, the change takes effect at the next billing date.' },
  { q: 'Is there a free trial for paid plans?', a: 'The free plan gives you 10 generations to test every tool before upgrading. No trial period needed — you see the quality before you pay.' },
  { q: 'What AI model powers the tools?', a: 'ToolForge uses Google Gemini Flash — a fast, high-quality model that produces professional copy across all 6 tools.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your account settings. You keep access until the end of your billing period.' },
  { q: 'Do unused generations roll over?', a: 'No. Credits reset each month. Unused generations do not carry forward.' },
];

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing — ToolForge AI</title>
        <meta name="description" content="Simple pricing for ToolForge AI. Free plan, $9 Starter, $29 Pro, $99 Agency. AI copywriting tools for marketers." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <main style={{ padding: '80px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 style={{ fontSize: 42, fontWeight: 700, color: '#fff', marginBottom: 14, letterSpacing: '-1px' }}>
            Simple, honest pricing
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto' }}>
            Start free. Upgrade when you need more. Cancel anytime.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, marginBottom: 80 }}>
          {PLANS.map((plan, i) => (
            <div key={i} style={{
              padding: 28,
              background: plan.popular ? 'rgba(29,158,117,0.08)' : 'rgba(255,255,255,0.03)',
              border: plan.popular ? '2px solid rgba(29,158,117,0.4)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, position: 'relative', display: 'flex', flexDirection: 'column',
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: -1, right: 20,
                  fontSize: 10, fontWeight: 700, background: '#1D9E75', color: '#fff',
                  padding: '3px 10px', borderRadius: '0 0 8px 8px', letterSpacing: '0.5px',
                }}>MOST POPULAR</div>
              )}

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 8 }}>
                  <span style={{ fontSize: 34, fontWeight: 700, color: plan.popular ? '#1D9E75' : '#fff' }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{plan.desc}</p>
              </div>

              <ul style={{ listStyle: 'none', marginBottom: 24, flex: 1 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                    <span style={{ color: '#1D9E75', flexShrink: 0, marginTop: 1 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan.href} style={{ textDecoration: 'none' }}>
                <button className={plan.popular ? 'btn-primary' : 'btn-ghost'} style={{ width: '100%', justifyContent: 'center' }}>
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 32, textAlign: 'center' }}>
            Frequently asked questions
          </h2>
          <div style={{ display: 'grid', gap: 1 }}>
            {FAQ.map((faq, i) => (
              <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{faq.q}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
