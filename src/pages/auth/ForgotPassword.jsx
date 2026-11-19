import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Feedback } from '../../components/ui/Feedback';
import { api } from '../../utils/api';

export default function ForgotPassword() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api('/auth/recovery', { method: 'POST', body: Object.fromEntries(new FormData(event.currentTarget)) });
      navigate('/otp', { state: { requested: true } });
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Reset password</h1>
      <p className="mt-2 text-slate-500">Request a recovery code for your account.</p>
      <form className="mt-8 space-y-4" onSubmit={submit}>
        <Feedback error={error} />
        <label className="field-label">Email<input name="email" type="email" autoComplete="email" className="input-field" required /></label>
        <button className="btn-primary w-full" disabled={busy}>Send recovery code</button>
      </form>
      <Link to="/login" className="mt-6 block text-sm font-medium text-nexa-600 dark:text-nexa-300">Back to sign in</Link>
    </>
  );
}
