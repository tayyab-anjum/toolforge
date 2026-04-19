// pages/_app.js
import '../styles/globals.css';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('tf_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  function login(userData) {
    setUser(userData);
    localStorage.setItem('tf_user', JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('tf_user');
    localStorage.removeItem('tf_token');
    window.location.href = '/';
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
