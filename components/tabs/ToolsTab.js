// components/tabs/ToolsTab.js
import { useState } from 'react';

const TOOLS = [
  {
    id: 'ad',
    name: 'Ad Copy',
    desc: 'Facebook & Instagram',
    fields: [
      { id: 'product', label: 'Product name', placeholder: 'e.g. Nike shoes' },
      { id: 'audience', label: 'Target audience', placeholder: 'e.g. young men age 18-25' },
      { id: 'tone', label: 'Tone', placeholder: 'e.g. energetic, urgent, friendly' },
    ],
  },
  {
    id: 'email',
    name: 'Cold Email',
    desc: 'Sales outreach',
    fields: [
      { id: 'sender', label: 'Your company', placeholder: 'e.g. ToolForge AI' },
      { id: 'prospect', label: 'Prospect type', placeholder: 'e.g. Shopify store owners' },
      { id: 'offer', label: 'Your offer', placeholder: 'e.g. save 3 hours/week on product descriptions' },
    ],
  },
  {
    id: 'seo',
    name: 'SEO Metas',
    desc: 'Title + description',
    fields: [
      { id: 'page', label: 'Page topic', placeholder: 'e.g. AI product description generator' },
      { id: 'keyword', label: 'Target keyword', placeholder: 'e.g. AI copywriting tool' },
      { id: 'brand', label: 'Brand name', placeholder: 'e.g. ToolForge' },
    ],
  },
  {
    id: 'product',
    name: 'Product Description',
    desc: 'Ecommerce listings',
    fields: [
      { id: 'pname', label: 'Product name', placeholder: 'e.g. Bamboo Phone Stand' },
      { id: 'features', label: 'Key features', placeholder: 'e.g. adjustable angle, eco-friendly' },
      { id: 'buyer', label: 'Ideal buyer', placeholder: 'e.g. remote workers, students' },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Bio',
    desc: 'Profile optimization',
    fields: [
      { id: 'role', label: 'Job title', placeholder: 'e.g. Freelance UI Designer' },
      { id: 'exp', label: 'Years of experience', placeholder: 'e.g. 5 years' },
      { id: 'achieve', label: 'Top achievement', placeholder: 'e.g. helped 50+ startups launch' },
    ],
  },
  {
    id: 'review',
    name: 'Review Reply',
    desc: 'Customer responses',
    fields: [
      { id: 'review', label: 'Paste the review', placeholder: 'e.g. Product was great but shipping was slow...', textarea: true },
      { id: 'biz', label: 'Business name', placeholder: 'e.g. The Coffee Box' },
      { id: 'sentiment', label: 'Sentiment', placeholder: 'positive / negative / mixed' },
    ],
  },
];

export default function ToolsTab({ user }) {
  const [activeTool, setActiveTool] = useState(TOOLS[0]);
  const [fields, setFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function selectTool(tool) {
    setActiveTool(tool);
    setFields({});
    setOutput('');
    setError('');
  }

  function updateField(id, value) {
    setFields(prev => ({ ...prev, [id]: value }));
  }

  async function generate() {
    const missing = activeTool.fields.find(f => !fields[f.id]?.trim());
    if (missing) {
      setError('Please fill in: ' + missing.label);
      return;
    }
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const token = localStorage.getItem('tf_token');
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ toolId: activeTool.id, fields }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Generation failed');
        setLoading(false);
        return;
      }
      setOutput(data.result);
    } catch (e) {
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
        {TOOLS.map(tool => (
          <div
            key={tool.id}
            onClick={() => selectTool(tool)}
            style={{
              padding: '14px 12px',
              cursor: 'pointer',
              background: activeTool.id === tool.id ? 'rgba(29,158,117,0.15)' : 'rgba(255,255,255,0.04)',
              border: activeTool.id === tool.id ? '1px solid rgba(29,158,117,0.5)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              userSelect: 'none',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: activeTool.id === tool.id ? '#1D9E75' : '#fff', marginBottom: 3 }}>
              {tool.name}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{tool.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{activeTool.name}</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>{activeTool.desc}</p>

        {activeTool.fields.map(f => (
          <div key={f.id} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>{f.label}</label>
            {f.textarea ? (
              <textarea
                rows={3}
                placeholder={f.placeholder}
                value={fields[f.id] || ''}
                onChange={e => updateField(f.id, e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#f0f0f0', fontSize: 14, fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
              />
            ) : (
              <input
                type="text"
                placeholder={f.placeholder}
                value={fields[f.id] || ''}
                onChange={e => updateField(f.id, e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#f0f0f0', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
              />
            )}
          </div>
        ))}

        {error && (
          <div style={{ background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.25)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#ff8080' }}>
            {error}
          </div>
        )}

        <div
          onClick={!loading ? generate : undefined}
          style={{ width: '100%', padding: 13, background: loading ? 'rgba(29,158,117,0.5)' : '#1D9E75', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', textAlign: 'center', userSelect: 'none' }}
        >
          {loading ? 'Generating...' : 'Generate'}
        </div>

        {output && (
          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1D9E75' }}>Output</span>
              <div onClick={copyOutput} style={{ fontSize: 12, padding: '4px 12px', background: copied ? 'rgba(29,158,117,0.2)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, color: copied ? '#1D9E75' : 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                {copied ? 'Copied!' : 'Copy'}
              </div>
            </div>
            <div style={{ background: 'rgba(29,158,117,0.06)', border: '1px solid rgba(29,158,117,0.2)', borderRadius: 12, padding: 16, fontSize: 14, lineHeight: 1.7, color: '#e8e8e8', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
