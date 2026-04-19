// pages/app.js — Main dashboard with all 4 tabs
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './_app';
import Navbar from '../components/Navbar';
import ToolsTab from '../components/tabs/ToolsTab';
import BuilderTab from '../components/tabs/BuilderTab';
import PricingTab from '../components/tabs/PricingTab';
import LaunchTab from '../components/tabs/LaunchTab';

const TABS = [
  { id: 'tools', label: 'Tools' },
  { id: 'builder', label: 'Builder' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'launch', label: 'Launch' },
];

export default function AppPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tools');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/app');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const t = router.query.tab;
    if (t && TABS.find(x => x.id === t)) setActiveTab(t);
  }, [router.query.tab]);

  function switchTab(id) {
    setActiveTab(id);
    router.push({ pathname: '/app', query: { tab: id } }, undefined, { shallow: true });
  }

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner" style={{ width: 28, height: 28 }} />
      </div>
    );
  }

  const creditsLeft = (user.creditsLimit || 10) - (user.creditsUsed || 0);
  const creditsPct = Math.max(0, (creditsLeft / (user.creditsLimit || 10)) * 100);

  return (
    <>
      <Head>
        <title>Dashboard — ToolForge AI</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        {/* Credits bar */}
        <div className="glass" style={{ padding: '14px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                {user.plan === 'agency' ? 'Unlimited plan' : `Credits — ${creditsLeft} of ${user.creditsLimit || 10} remaining`}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1D9E75', textTransform: 'capitalize' }}>
                {user.plan || 'free'} plan
              </span>
            </div>
            {user.plan !== 'agency' && (
              <div style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${creditsPct}%`, height: '100%', background: creditsPct < 20 ? '#EF9F27' : '#1D9E75', borderRadius: 3, transition: 'width 0.4s' }} />
              </div>
            )}
          </div>
          {(user.plan === 'free' || !user.plan) && (
            <a href="/pricing" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 13 }}>Upgrade →</button>
            </a>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 32, gap: 0 }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => switchTab(tab.id)} style={{
              padding: '10px 20px', fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? '#1D9E75' : 'rgba(255,255,255,0.5)',
              background: 'transparent', border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #1D9E75' : '2px solid transparent',
              marginBottom: -1, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'tools' && <ToolsTab user={user} />}
        {activeTab === 'builder' && <BuilderTab user={user} />}
        {activeTab === 'pricing' && <PricingTab user={user} />}
        {activeTab === 'launch' && <LaunchTab />}
      </div>
    </>
  );
}
