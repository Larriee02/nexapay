import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = signup(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate('/otp', { state: { email: form.email } });
  };

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Create account</h1>
      <p className="mt-1 text-slate-500">Start your NexaPay journey</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50">{error}</div>}
        <div>
          <label className="mb-1 block text-sm font-medium">Full name</label>
          <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input type="password" className="input-field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
        </div>
        <button type="submit" className="btn-primary w-full">Continue</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Have an account? <Link to="/login" className="text-nexa-500 font-medium hover:underline">Sign in</Link>
      </p>
    </>
  );
}
