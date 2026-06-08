import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Download, ArrowLeftRight, Calendar, QrCode } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { formatCurrency } from '../../utils/format';
import { storage } from '../../utils/storage';

const tabs = [
  { id: 'send', label: 'Send', icon: Send },
  { id: 'receive', label: 'Receive', icon: Download },
  { id: 'transfer', label: 'Transfer', icon: ArrowLeftRight },
  { id: 'scheduled', label: 'Scheduled', icon: Calendar },
  { id: 'qr', label: 'QR Pay', icon: QrCode },
];

export default function Payments() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'send';
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handlePay = (e) => {
    e.preventDefault();
    const payments = storage.get('payments', []);
    payments.unshift({
      id: Date.now(),
      type: tab,
      amount: parseFloat(amount),
      recipient,
      date: new Date().toISOString(),
    });
    storage.set('payments', payments);
    setMessage(`Payment of ${formatCurrency(parseFloat(amount))} submitted successfully!`);
    setAmount('');
    setRecipient('');
  };

  return (
    <div>
      <PageHeader title="Payments" subtitle="Send, receive, transfer, and schedule payments" />
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setParams({ tab: id })}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              tab === id ? 'bg-nexa-500 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {tab === 'qr' ? (
          <div className="card flex flex-col items-center justify-center p-12">
            <div className="grid h-48 w-48 grid-cols-8 gap-1 rounded-xl bg-slate-900 p-4">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`rounded-sm ${i % 3 === 0 ? 'bg-white' : 'bg-slate-700'}`} />
              ))}
            </div>
            <p className="mt-6 font-semibold">Scan to pay Alex Morgan</p>
            <p className="text-sm text-slate-500">nexapay://pay/alex-morgan</p>
          </div>
        ) : tab === 'scheduled' ? (
          <div className="card lg:col-span-2">
            <h3 className="font-semibold">Scheduled payments</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: 'Rent', amount: 1200, date: 'Jun 1, 2026' },
                { name: 'Netflix', amount: 15.99, date: 'Jun 24, 2026' },
              ].map((s) => (
                <li key={s.name} className="flex justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <span>{s.name}</span>
                  <span className="font-semibold">{formatCurrency(s.amount)} · {s.date}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : tab === 'receive' ? (
          <div className="card lg:col-span-2 text-center p-12">
            <p className="text-slate-500">Your receive link</p>
            <p className="mt-2 font-mono text-lg text-nexa-500">pay.nexapay.com/u/alex-morgan</p>
            <button type="button" className="btn-primary mt-6">Copy link</button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="card space-y-4">
            <h3 className="font-semibold capitalize">{tab} money</h3>
            {message && <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950/50">{message}</div>}
            <div>
              <label className="mb-1 block text-sm font-medium">Amount</label>
              <input type="number" step="0.01" className="input-field" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{tab === 'transfer' ? 'To account' : 'Recipient'}</label>
              <input className="input-field" value={recipient} onChange={(e) => setRecipient(e.target.value)} required placeholder="email or account" />
            </div>
            <button type="submit" className="btn-primary w-full">Confirm {tab}</button>
          </form>
        )}
        {tab !== 'scheduled' && tab !== 'receive' && (
          <div className="card">
            <h3 className="font-semibold">From wallet</h3>
            <p className="mt-2 font-display text-3xl font-bold">{formatCurrency(24580.42)}</p>
            <p className="text-sm text-slate-500">Available balance</p>
          </div>
        )}
      </div>
    </div>
  );
}
