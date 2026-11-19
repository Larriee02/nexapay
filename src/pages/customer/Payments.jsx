import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, Calendar, QrCode } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { Feedback, ResourceState } from '../../components/ui/Feedback';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/format';
import { useResource } from '../../utils/useResource';

const tabs = [
  ['send', 'Send', ArrowUpRight],
  ['receive', 'Request', ArrowDownLeft],
  ['transfer', 'Transfer', ArrowLeftRight],
  ['scheduled', 'Scheduled', Calendar],
  ['qr', 'QR code', QrCode],
];

function Receive({ qr, email }) {
  const [image, setImage] = useState('');
  const [notice, setNotice] = useState({});
  const url = new URL('/payments', window.location.origin);
  url.searchParams.set('recipient', email);
  const link = url.href;
  useEffect(() => {
    if (!qr) return;
    let active = true;
    import('qrcode').then(({ default: generator }) => generator.toDataURL(link, { width: 208, margin: 2 }))
      .then((source) => { if (active) setImage(source); })
      .catch(() => { if (active) setNotice({ error: 'The QR code could not be generated.' }); });
    return () => { active = false; };
  }, [qr, link]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setNotice({ message: 'Payment link copied.' });
    } catch {
      setNotice({ error: 'Copy the link from the field below.' });
    }
  }

  return (
    <section className="card space-y-4">
      <h2 className="section-title">{qr ? 'Payment QR code' : 'Request a wallet payment'}</h2>
      <p className="text-sm text-slate-500">Share this link with someone who has a NexaPay wallet.</p>
      {qr && image && <img src={image} width={208} height={208} alt="QR code for your wallet payment link" className="rounded-xl" />}
      <Feedback {...notice} />
      <label className="field-label">Payment link<input className="input-field" readOnly value={link} onFocus={(event) => event.currentTarget.select()} /></label>
      <button className="btn-primary" onClick={copy}>Copy payment link</button>
    </section>
  );
}

function PaymentForm({ tab, recipient, onPaid }) {
  const [notice, setNotice] = useState({});
  const [busy, setBusy] = useState(false);
  const request = useRef(null);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = { ...Object.fromEntries(new FormData(form)), type: tab };
    const fingerprint = JSON.stringify(body);
    if (request.current?.fingerprint !== fingerprint) {
      request.current = { fingerprint, id: crypto.randomUUID() };
    }
    setNotice({});
    setBusy(true);
    try {
      await api('/ledger', { method: 'POST', body: { ...body, requestId: request.current.id } });
      request.current = null;
      form.reset();
      setNotice({ message: 'Payment completed. You can see it in Transactions.' });
      onPaid();
    } catch (error) {
      setNotice({ error: error.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card space-y-5" onSubmit={submit}>
      <h2 className="section-title">{tab === 'transfer' ? 'Transfer between wallets' : 'Send a payment'}</h2>
      <Feedback {...notice} />
      <label className="field-label">Recipient email<input className="input-field" name="recipient" type="email" defaultValue={recipient} placeholder="name@example.com" required /></label>
      <label className="field-label">Amount in USD<input className="input-field" name="amount" type="number" inputMode="decimal" min="0.01" max="9999999.99" step="0.01" placeholder="0.00" required /></label>
      <button className="btn-primary" disabled={busy}>{busy ? 'Processing…' : 'Confirm payment'}</button>
    </form>
  );
}

export default function Payments() {
  const [params, setParams] = useSearchParams();
  const tab = tabs.some(([id]) => id === params.get('tab')) ? params.get('tab') : 'send';
  const { user } = useAuth();
  const wallet = useResource('/ledger');

  return (
    <div>
      <PageHeader title="Payments" subtitle="Move demo funds between NexaPay wallets." />
      <div className="segment-bar" aria-label="Payment options">
        {tabs.map(([id, label, Icon]) => <button className="segment" key={id} type="button" aria-pressed={tab === id} onClick={() => setParams({ tab: id })}><Icon size={16} aria-hidden="true" />{label}</button>)}
      </div>
      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1.4fr_1fr]">
        {tab === 'receive' || tab === 'qr' ? <Receive key={tab} qr={tab === 'qr'} email={user.email} />
          : tab === 'scheduled' ? <section className="card"><h2 className="section-title">Scheduled payments</h2><p className="mt-3 text-sm text-slate-500">Scheduling is unavailable. Use Send to make a payment now.</p></section>
          : <PaymentForm key={`${tab}:${params.get('recipient') || ''}`} tab={tab} recipient={params.get('recipient') || ''} onPaid={wallet.refresh} />}
        <ResourceState {...wallet}>
          <div className="balance-panel"><p>Available balance</p><strong>{formatCurrency(Number(wallet.data?.balance) / 100)}</strong><span>USD wallet · Demo funds</span></div>
        </ResourceState>
      </div>
    </div>
  );
}
