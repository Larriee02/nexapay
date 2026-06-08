import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, dashboardPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(from || dashboardPath(result.user.role));
  };

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-slate-500">Sign in to your NexaPay account</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50">{error}</div>}
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="alex@demo.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="demo123" />
        </div>
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-nexa-500 hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" className="btn-primary w-full">Sign in</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        No account? <Link to="/signup" className="text-nexa-500 font-medium hover:underline">Sign up</Link>
      </p>
      <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
        <p className="font-semibold">Demo accounts:</p>
        <p>alex@demo.com — customer</p>
        <p>biz@demo.com — merchant</p>
        <p>admin@demo.com — admin</p>
        <p>Password: demo123</p>
      </div>
    </>
  );
}
