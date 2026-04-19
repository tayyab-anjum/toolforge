// components/tabs/BuilderTab.js
import { useState } from 'react';

export default function BuilderTab({ user }) {
  const [fields, setFields] = useState({ niche: '', task: '', pain: '' });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const examples = [
    { niche: 'Real estate agents', task: 'Property listings', pain: 'spend 2–3 hours writing each listing' },
    { niche: 'Dentists', task: 'Appointment reminder messages', pain: 'high no-show rates, no time to write messages' },
    { niche: 'SaaS founders', task: 'Onboarding email sequences', pain: 'low trial-to-paid conversion, poor onboarding emails' },
  ];

  async function build() {
    if (!fields.niche.trim() || !fields.task.trim() || !fields.pain.trim()) {
      setError('Please fill in all 3 fields');
      return;
    }
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const token = localStorage.getItem('tf_token');
      const res = await fetch('/api/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Build failed'); setLoading(false); return; }
      setOutput(data.result);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  function copyOutput() {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Custom Tool Builder</h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
          Describe any niche and the AI writes you a ready-to-use system prompt, pricing structure, and acquisition strategy for that exact market.
        </p>
      </div>

      {/* Example chips */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Examples — click to fill:</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setFields({ niche: ex.niche, task: ex.task, pain: ex.pain })}
              style={{
                fontSize: 12, padding: '5px 12px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                transition: 'all 0.15s', fontFamily: 'inherit',
              }}
              onMouseEnter={e => { e.target.style.borderColor = 'rgba(29,158,117,0.4)'; e.target.style.color = '#1D9E75'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = 'rgba(255,255,255,0.6)'; }}
            >{ex.niche}</button>
          ))}
        </div>
      </div>

      <div className="glass" style={{ padding: 28 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
            What niche or business type?
          </label>
          <input className="input-base" type="text"
            placeholder="e.g. real estate agents, dentists, SaaS founders, gym owners..."
            value={fields.niche}
            onChange={e => setFields({ ...fields, niche: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
            What content do they need to generate?
          </label>
          <input className="input-base" type="text"
            placeholder="e.g. property listings, appointment reminders, onboarding emails..."
            value={fields.task}
            onChange={e => setFields({ ...fields, task: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
            What is their biggest pain point?
          </label>
          <input className="input-base" type="text"
            placeholder="e.g. spend 2 hours writing listings, no marketing budget, high no-show rates..."
            value={fields.pain}
            onChange={e => setFields({ ...fields, pain: e.target.value })}
          />
        </div>

        {error && (
          <div style={{ background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.25)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#ff8080' }}>
            {error}
          </div>
        )}

        <button className="btn-primary" onClick={build} disabled={loading} style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: 12 }}>
          {loading ? <><span className="spinner" /> Building your tool...</> : 'Build my tool'}
        </button>

        {output && (
          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1D9E75' }}>Your custom tool blueprint</span>
              <button onClick={copyOutput} style={{
                fontSize: 12, padding: '4px 12px',
                background: copied ? 'rgba(29,158,117,0.2)' : 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, color: copied ? '#1D9E75' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
              }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="output-box">{output}</div>
          </div>
        )}
      </div>
    </div>
  );
}
