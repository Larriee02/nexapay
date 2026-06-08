import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { requestOtp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    requestOtp(email);
    setSent(true);
    setTimeout(() => navigate('/otp', { state: { email } }), 1500);
  };

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Reset password</h1>
      <p className="mt-1 text-slate-500">We&apos;ll send a verification code to your email</p>
      {sent ? (
        <div className="mt-8 rounded-xl bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-950/50">
          Code sent! Redirecting to verification…
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary w-full">Send code</button>
        </form>
      )}
      <p className="mt-6 text-center text-sm">
        <Link to="/login" className="text-nexa-500 hover:underline">← Back to login</Link>
      </p>
    </>
  );
}
