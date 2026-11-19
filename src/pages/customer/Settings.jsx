import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Feedback } from '../../components/ui/Feedback';
import PageHeader from '../../components/ui/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notice, setNotice] = useState({});
  const [busy, setBusy] = useState(false);

  async function save(event) {
    event.preventDefault();
    setNotice({});
    setBusy(true);
    try {
      await updateProfile(Object.fromEntries(new FormData(event.currentTarget)));
      setNotice({ message: 'Profile updated.' });
    } catch (error) {
      setNotice({ error: error.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your profile and appearance." />
      <div className="grid items-start gap-5 lg:grid-cols-[1.2fr_1fr]">
        <form className="card space-y-4" onSubmit={save}>
          <h2 className="section-title">Profile</h2>
          <Feedback {...notice} />
          <label className="field-label">Name<input className="input-field" name="name" defaultValue={user.name} maxLength={100} required /></label>
          <label className="field-label">Email<input className="input-field" value={user.email} readOnly /></label>
          <button className="btn-primary" disabled={busy}>Save changes</button>
        </form>
        <div className="space-y-5">
          <section className="card">
            <h2 className="section-title">Appearance</h2>
            <div className="segment-bar mt-4" aria-label="Color theme">
              {['light', 'dark'].map((option) => (
                <button key={option} type="button" className="segment capitalize" aria-pressed={theme === option} onClick={() => setTheme(option)}>{option}</button>
              ))}
            </div>
          </section>
          <section className="card">
            <h2 className="section-title">Password</h2>
            <Link to="/forgot-password" className="btn-secondary mt-4">Request a password reset</Link>
          </section>
        </div>
      </div>
    </div>
  );
}
