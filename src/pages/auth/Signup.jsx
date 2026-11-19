import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Feedback } from '../../components/ui/Feedback';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await authenticate('signup', Object.fromEntries(new FormData(event.currentTarget)));
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Create an account</h1>
      <p className="mt-2 text-slate-500">Open a NexaPay demo wallet.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Feedback error={error} />
        <label className="field-label">Full name<input name="name" autoComplete="name" className="input-field" maxLength={100} required /></label>
        <label className="field-label">Email<input name="email" type="email" autoComplete="email" className="input-field" maxLength={254} required /></label>
        <label className="field-label">Password<input name="password" type="password" autoComplete="new-password" className="input-field" minLength={8} maxLength={128} required /></label>
        <button className="btn-primary w-full" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link to="/login" className="font-semibold text-nexa-600 dark:text-nexa-300">Sign in</Link></p>
    </>
  );
}
