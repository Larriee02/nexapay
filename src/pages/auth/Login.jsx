import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Feedback } from '../../components/ui/Feedback';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { authenticate, dashboardPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const user = await authenticate('login', Object.fromEntries(new FormData(event.currentTarget)));
      const from = location.state?.from;
      navigate(from ? { pathname: from.pathname, search: from.search } : dashboardPath(user.role), { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-slate-500">Access your NexaPay workspace.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Feedback error={error} />
        <label className="field-label">Email<input name="email" type="email" autoComplete="email" className="input-field" required /></label>
        <label className="field-label">Password<input name="password" type="password" autoComplete="current-password" className="input-field" required /></label>
        <Link to="/forgot-password" className="block text-right text-sm font-medium text-nexa-600 dark:text-nexa-300">Forgot password?</Link>
        <button className="btn-primary w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">New to NexaPay? <Link to="/signup" className="font-semibold text-nexa-600 dark:text-nexa-300">Create an account</Link></p>
    </>
  );
}
