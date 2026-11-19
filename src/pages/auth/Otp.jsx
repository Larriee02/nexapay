import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Feedback } from '../../components/ui/Feedback';
import { api } from '../../utils/api';

export default function Otp() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const location = useLocation();

  async function submit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api('/auth/reset', { method: 'POST', body: Object.fromEntries(new FormData(event.currentTarget)) });
      window.location.assign('/login');
    } catch (error) {
      setError(error.message);
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Choose a new password</h1>
      {location.state?.requested && <p className="mt-2 text-sm text-slate-500">If the address is registered, check your email for a recovery code.</p>}
      <form className="mt-8 space-y-4" onSubmit={submit}>
        <Feedback error={error} />
        <label className="field-label">Recovery code<input name="code" autoComplete="one-time-code" className="input-field" required /></label>
        <label className="field-label">New password<input name="password" type="password" autoComplete="new-password" className="input-field" minLength={8} maxLength={128} required /></label>
        <button className="btn-primary w-full" disabled={busy}>Update password</button>
      </form>
      <Link to="/forgot-password" className="mt-6 block text-sm text-nexa-600 dark:text-nexa-300">Request another code</Link>
    </>
  );
}
