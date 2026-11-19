import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export default function ActivityList({ payments }) {
  if (!payments.length) return <p className="py-8 text-sm text-slate-500">No transactions to show yet.</p>;

  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
      {payments.map((payment) => {
        const Icon = payment.outgoing ? ArrowUpRight : ArrowDownLeft;
        return (
          <li key={payment.id} className="flex items-center gap-3 py-4">
            <span className="icon-tile"><Icon size={18} aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{payment.counterparty}</p>
              <p className="text-xs capitalize text-slate-500">{payment.type} · {new Date(payment.created_at).toLocaleDateString()}</p>
            </div>
            <p className={`shrink-0 text-sm font-semibold tabular-nums ${payment.outgoing ? '' : 'text-emerald-700 dark:text-emerald-300'}`}>
              {payment.outgoing ? '−' : '+'}{formatCurrency(Number(payment.amount_cents) / 100)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
