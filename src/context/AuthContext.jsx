import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { storage } from '../utils/storage';

const AuthContext = createContext(null);
const dashboardPath = (role) => ({ merchant: '/merchant', admin: '/admin' })[role] || '/dashboard';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    for (const key of ['user', 'pendingSignup', 'otpEmail', 'payments']) {
      try {
        storage.remove(key);
      } catch {
        break;
      }
    }
    api('/auth/session', { signal: controller.signal }).then(
      (session) => { setUser(session.user); setLoading(false); },
      (error) => {
        if (!controller.signal.aborted) {
          setSessionError(error.message);
          setLoading(false);
        }
      },
    );
    return () => controller.abort();
  }, [attempt]);

  async function authenticate(path, body) {
    const session = await api(`/auth/${path}`, { method: 'POST', body });
    setUser(session.user);
    setSessionError('');
    return session.user;
  }

  async function updateProfile(body) {
    const profile = await api('/auth/profile', { method: 'PATCH', body });
    setUser(profile.user);
  }

  async function logout() {
    await api('/auth/logout', { method: 'POST' });
    setUser(null);
  }

  function retrySession() {
    setLoading(true);
    setSessionError('');
    setAttempt((value) => value + 1);
  }

  return (
    <AuthContext.Provider value={{ user, loading, sessionError, retrySession, authenticate, updateProfile, logout, dashboardPath }}>
      {children}
    </AuthContext.Provider>
  );
}

// The provider and consumer hook share the same context.
export const useAuth = () => useContext(AuthContext); // eslint-disable-line react-refresh/only-export-components
