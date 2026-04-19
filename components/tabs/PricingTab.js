// components/tabs/PricingTab.js
import { useState } from 'react';
import Link from 'next/link';

export default function PricingTab({ user }) {
  const [s1, setS1] = useState(50);   // starter
  const [s2, setS2] = useState(20);   // pro
  const [s3, setS3] = useState(5);    // agency
  const [apiCost, setApiCost] = useState(1.5); // per user per month

  const mrr = s1 * 9 + s2 * 29 + s3 * 99;
  const arr = mrr * 12;
  const totalUsers = s1 + s2 + s3;
  const totalApiCost = Math.round(totalUsers * apiCost);
  const profit = mrr - totalApiCost;
  const margin = mrr > 0 ? Math.round((profit / mrr) * 100) : 0;

  const plans = [
    { key: 'starter', name: 'Starter', price: 9, credits: 100, desc: 'Perfect for solo creators and freelancers', popular: false },
    { key: 'pro', name: 'Pro', price: 29, credits: 500, desc: 'For serious marketers and small teams', popular: true },
    { key: 'agency', name: 'Agency', price: 99, credits: null, desc: 'Unlimited generations for teams and agencies', popular: false },
  ];

  async function handleUpgrade(planKey) {
    try {
      const token = localStorage.getItem('tf_token');
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan: planKey, email: user.email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert('Could not create checkout session. Please try again.');
    } catch {
      alert('Something went wrong. Please try again.');
    }
  }

  return (
    <div>
      {/* Plans */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Plans</h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>Upgrade anytime. Cancel anytime.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {/* Free plan */}
          <div style={{
            padding: 24,
            background: user.plan === 'free' || !user.plan ? 'rgba(29,158,117,0.06)' : 'rgba(255,255,255,0.03)',
            border: user.plan === 'free' || !user.plan ? '1px solid rgba(29,158,117,0.25)' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 6 }}>Free</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>$0</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20, lineHeight: 1.5 }}>10 generations to try every tool</p>
            {(user.plan === 'free' || !user.plan) ? (
              <div style={{ fontSize: 13, color: '#1D9E75', fontWeight: 500 }}>✓ Current plan</div>
            ) : (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>—</div>
            )}
          </div>

          {plans.map(plan => {
            const isCurrent = user.plan === plan.key;
            return (
              <div key={plan.key} style={{
                padding: 24,
                background: plan.popular ? 'rgba(29,158,117,0.08)' : 'rgba(255,255,255,0.03)',
                border: plan.popular ? '2px solid rgba(29,158,117,0.35)' : isCurrent ? '1px solid rgba(29,158,117,0.25)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, position: 'relative',
              }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -1, right: 16, fontSize: 10, fontWeight: 700, background: '#1D9E75', color: '#fff', padding: '3px 10px', borderRadius: '0 0 8px 8px', letterSpacing: '0.5px' }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{plan.name}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: plan.popular ? '#1D9E75' : '#fff', marginBottom: 4 }}>${plan.price}<span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>/mo</span></div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                  {plan.credits ? `${plan.credits} generations/month` : 'Unlimited generations'}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20, lineHeight: 1.5 }}>{plan.desc}</p>
                {isCurrent ? (
                  <div style={{ fontSize: 13, color: '#1D9E75', fontWeight: 500 }}>✓ Current plan</div>
                ) : (
                  <button
                    className={plan.popular ? 'btn-primary' : 'btn-ghost'}
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => handleUpgrade(plan.key)}
                  >
                    Upgrade to {plan.name}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Revenue calculator */}
      <div className="glass" style={{ padding: 28 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Revenue calculator</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>Drag the sliders to see your projected MRR, ARR, and profit margin.</p>

        {[
          { label: `Starter subscribers ($9/mo)`, val: s1, set: setS1, max: 300 },
          { label: `Pro subscribers ($29/mo)`, val: s2, set: setS2, max: 150 },
          { label: `Agency subscribers ($99/mo)`, val: s3, set: setS3, max: 50 },
          { label: `API cost per user ($/mo)`, val: apiCost, set: setApiCost, max: 5, step: 0.5, prefix: '$', decimals: 2 },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', width: 230, flexShrink: 0 }}>{row.label}</span>
            <input type="range" min={0} max={row.max} step={row.step || 1} value={row.val}
              onChange={e => row.set(+e.target.value)}
              style={{ flex: 1, accentColor: '#1D9E75' }}
            />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', minWidth: 56, textAlign: 'right' }}>
              {row.prefix || ''}{row.decimals ? row.val.toFixed(row.decimals) : row.val}
            </span>
          </div>
        ))}

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 24 }}>
          {[
            { label: 'MRR', value: '$' + mrr.toLocaleString() },
            { label: 'ARR', value: '$' + arr.toLocaleString() },
            { label: 'Net profit/mo', value: '$' + profit.toLocaleString() },
            { label: 'Margin', value: margin + '%' },
          ].map((m, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', padding: '14px 12px', borderRadius: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: margin < 0 && m.label !== 'MRR' && m.label !== 'ARR' ? '#ff8080' : '#1D9E75' }}>{m.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
            <span>Profit margin</span>
            <span>API costs: ${totalApiCost}/mo for {totalUsers} users</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(0, Math.min(100, margin))}%`, height: '100%', background: margin < 40 ? '#EF9F27' : '#1D9E75', borderRadius: 3, transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
