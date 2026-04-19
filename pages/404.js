// pages/404.js
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — ToolForge AI</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 80, fontWeight: 700, color: 'rgba(255,255,255,0.06)', lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Page not found</h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>This page does not exist or has been moved.</p>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <button className="btn-primary">Go home</button>
        </Link>
      </div>
    </>
  );
}
