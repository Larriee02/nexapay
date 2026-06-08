import { createContext, useContext, useState, useCallback } from 'react';
import { DEMO_USERS } from '../data/mockData';
import { storage } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get('user', null));
  const [pendingEmail, setPendingEmail] = useState(null);

  const persist = (u) => {
    setUser(u);
    if (u) storage.set('user', u);
    else storage.remove('user');
  };

  const login = useCallback((email, password) => {
    const found = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: 'Invalid email or password' };
    const { password: _, ...safe } = found;
    persist(safe);
    return { ok: true, user: safe };
  }, []);

  const signup = useCallback((data) => {
    const exists = DEMO_USERS.some((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (exists) return { ok: false, error: 'Email already registered' };
    setPendingEmail(data.email);
    storage.set('pendingSignup', data);
    return { ok: true, needsOtp: true };
  }, []);

  const verifyOtp = useCallback((_code) => {
    const pending = storage.get('pendingSignup');
    const email = pendingEmail || pending?.email;
    if (!email && !user) {
      const otpEmail = storage.get('otpEmail');
      if (otpEmail) {
        persist({ id: 'new', email: otpEmail, role: 'customer', name: otpEmail.split('@')[0], avatar: 'NP' });
        storage.remove('otpEmail');
        return { ok: true };
      }
    }
    if (pending) {
      const newUser = {
        id: `u_${Date.now()}`,
        email: pending.email,
        role: 'customer',
        name: pending.name || pending.email.split('@')[0],
        avatar: (pending.name || 'U').slice(0, 2).toUpperCase(),
      };
      persist(newUser);
      storage.remove('pendingSignup');
      setPendingEmail(null);
      return { ok: true, user: newUser };
    }
    if (user || email) return { ok: true };
    return { ok: true };
  }, [pendingEmail, user]);

  const requestOtp = useCallback((email) => {
    storage.set('otpEmail', email);
    setPendingEmail(email);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    persist(null);
    setPendingEmail(null);
  }, []);

  const dashboardPath = (role) => {
    if (role === 'merchant') return '/merchant';
    if (role === 'admin') return '/admin';
    return '/dashboard';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        verifyOtp,
        requestOtp,
        logout,
        pendingEmail,
        dashboardPath,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
