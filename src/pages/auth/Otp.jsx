import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Otp() {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const refs = useRef([]);
  const { verifyOtp, dashboardPath, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length !== 6) return;
    verifyOtp(code);
    const role = user?.role || 'customer';
    navigate(dashboardPath(role));
  };

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Verify your email</h1>
      <p className="mt-1 text-slate-500">
        Enter the 6-digit code sent to {email || 'your email'}. Demo: any 6 digits work.
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex justify-center gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-11 rounded-xl border border-slate-200 text-center text-xl font-bold dark:border-slate-700 dark:bg-slate-800"
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          ))}
        </div>
        <button type="submit" className="btn-primary mt-8 w-full">Verify</button>
      </form>
    </>
  );
}
