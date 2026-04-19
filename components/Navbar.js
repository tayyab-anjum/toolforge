// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../pages/_app';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const planColors = { starter: '#5DCAA5', pro: '#1D9E75', agency: '#EF9F27' };
  const planColor = planColors[user?.plan] || '#888';

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 60,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 30, height: 30, borderRadius: 8,
            background: '#1D9E75',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#fff',
          }}>T</span>
          <span style={{ fontWeight: 700, fontSize: 17, color: '#fff', letterSpacing: '-0.3px' }}>
            ToolForge <span style={{ color: '#1D9E75' }}>AI</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {user ? (
            <>
              <Link href="/app" style={{
                textDecoration: 'none', color: 'rgba(255,255,255,0.7)',
                fontSize: 14, padding: '6px 12px',
                background: router.pathname.startsWith('/app') ? 'rgba(29,158,117,0.1)' : 'transparent',
                border: router.pathname.startsWith('/app') ? '1px solid rgba(29,158,117,0.3)' : '1px solid transparent',
                borderRadius: 8, transition: 'all 0.15s',
              }}>Dashboard</Link>

              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
                    color: '#fff', fontSize: 14,
                  }}
                >
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: '#1D9E75',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                  }}>
                    {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </span>
                  <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name || user.email}
                  </span>
                  {user.plan && user.plan !== 'free' && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 6px',
                      background: planColor + '22', color: planColor,
                      border: `1px solid ${planColor}44`, borderRadius: 20,
                      textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}>{user.plan}</span>
                  )}
                </button>

                {menuOpen && (
                  <div style={{
                    position: 'absolute', right: 0, top: '110%',
                    background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12, padding: 8, minWidth: 180, zIndex: 200,
                  }}>
                    <Link href="/pricing" onClick={() => setMenuOpen(false)} style={{
                      display: 'block', padding: '8px 12px', color: 'rgba(255,255,255,0.8)',
                      textDecoration: 'none', fontSize: 14, borderRadius: 8,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                    >Upgrade plan</Link>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '4px 0' }} />
                    <button onClick={() => { setMenuOpen(false); logout(); }} style={{
                      display: 'block', width: '100%', padding: '8px 12px',
                      color: 'rgba(255,100,100,0.8)', background: 'transparent',
                      border: 'none', textAlign: 'left', fontSize: 14, cursor: 'pointer',
                      borderRadius: 8, transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,80,80,0.08)'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                    >Sign out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-ghost" style={{ padding: '7px 16px', fontSize: 14 }}>Log in</button>
              </Link>
              <Link href="/signup" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 14 }}>Get started free</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
      )}
    </nav>
  );
}
