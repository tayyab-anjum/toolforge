// pages/dashboard.js
// Redirect target after Stripe checkout — updates user plan and sends to /app
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './_app';
import Head from 'next/head';

export default function Dashboard() {
  const router = useRouter();
  const { user, login } = useAuth();

  useEffect(() => {
    if (!router.isReady) return;

    async function refreshUser() {
      const token = localStorage.getItem('tf_token');
      if (!token) { router.push('/login'); return; }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          login(data.user);
        }
      } catch {}

      const timeout = setTimeout(() => router.push('/app'), 2500);
      return () => clearTimeout(timeout);
    }

    refreshUser();
  }, [router.isReady]);

  const isSuccess = router.query.success === 'true';

  return (
    <>
      <Head>
        <title>{isSuccess ? 'Payment successful!' : 'Redirecting...'} — ToolForge AI</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, padding: 24, textAlign: 'center' }}>
        {isSuccess ? (
          <>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(29,158,117,0.15)', border: '2px solid #1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 14L11 20L23 8" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>You&apos;re all set!</h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>Your plan is now active. Taking you to your dashboard...</p>
          </>
        ) : (
          <>
            <span className="spinner" style={{ width: 32, height: 32 }} />
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>Redirecting to your dashboard...</p>
          </>
        )}
      </div>
    </>
  );
}
