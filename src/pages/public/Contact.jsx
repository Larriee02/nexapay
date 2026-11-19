import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LifeBuoy } from 'lucide-react';
import { Feedback } from '../../components/ui/Feedback';
import { api } from '../../utils/api';

export default function Contact() {
  const [notice, setNotice] = useState({});
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setNotice({});
    setBusy(true);
    try {
      await api('/contact', { method: 'POST', body: Object.fromEntries(new FormData(form)) });
      form.reset();
      setNotice({ message: 'Your message has been received.' });
    } catch (error) {
      setNotice({ error: error.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.8fr_1fr] md:py-24">
      <div>
        <h1 className="font-display text-5xl font-semibold tracking-tight">Contact us</h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-500">Send a question or tell us what happened. Your message goes directly to the NexaPay support inbox.</p>
        <Link to="/knowledge-base" className="btn-secondary mt-7"><LifeBuoy size={18} />Browse the help center</Link>
      </div>
      <form className="card space-y-4" onSubmit={submit}>
        <h2 className="section-title">Send a message</h2>
        <Feedback {...notice} />
        <label className="field-label">Name<input className="input-field" name="name" autoComplete="name" maxLength={100} required /></label>
        <label className="field-label">Email<input className="input-field" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label className="field-label">Subject<input className="input-field" name="subject" maxLength={150} required /></label>
        <label className="field-label">Message<textarea className="input-field" name="body" rows={5} maxLength={4000} required /></label>
        <button className="btn-primary" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
      </form>
    </section>
  );
}
