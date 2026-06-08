import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { TRANSACTIONS } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/format';

export default function Transactions() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? TRANSACTIONS : TRANSACTIONS.filter((t) => t.type === filter);

  return (
    <div>
      <PageHeader title="Transactions" subtitle="Full history of your account activity" />
      <div className="mb-4 flex flex-wrap gap-2">
        {['all', 'send', 'receive', 'bill', 'transfer', 'scheduled'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-sm capitalize ${filter === f ? 'bg-nexa-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3 text-slate-500">{t.category}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(t.date)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${t.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {t.status}
                  </span>
                </td>
                <td className={`px-4 py-3 text-right font-semibold ${t.amount > 0 ? 'text-emerald-500' : ''}`}>
                  {formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
