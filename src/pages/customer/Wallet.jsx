import { Plus, ArrowDownToLine } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { formatCurrency } from '../../utils/format';

export default function Wallet() {
  const accounts = [
    { name: 'Primary Wallet', balance: 24580.42, currency: 'USD' },
    { name: 'Savings', balance: 12500, currency: 'USD' },
    { name: 'EUR Wallet', balance: 3200, currency: 'EUR' },
  ];

  return (
    <div>
      <PageHeader title="Wallet" subtitle="Manage balances across accounts" />
      <div className="grid gap-4 md:grid-cols-3">
        {accounts.map((a) => (
          <div key={a.name} className="card">
            <p className="text-sm text-slate-500">{a.name}</p>
            <p className="mt-2 font-display text-2xl font-bold">{formatCurrency(a.balance, a.currency)}</p>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn-secondary flex-1 text-xs"><Plus className="h-4 w-4" /> Add</button>
              <button type="button" className="btn-secondary flex-1 text-xs"><ArrowDownToLine className="h-4 w-4" /> Withdraw</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
