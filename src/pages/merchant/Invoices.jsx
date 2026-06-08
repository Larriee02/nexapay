import PageHeader from '../../components/ui/PageHeader';
import { MERCHANT_INVOICES } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/format';

export default function Invoices() {
  const statusColor = { paid: 'bg-emerald-100 text-emerald-700', pending: 'bg-amber-100 text-amber-700', overdue: 'bg-red-100 text-red-700' };

  return (
    <div>
      <PageHeader title="Invoices" subtitle="Create and track customer invoices" action={<button type="button" className="btn-primary">New invoice</button>} />
      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {MERCHANT_INVOICES.map((inv) => (
              <tr key={inv.id}>
                <td className="px-4 py-3 font-medium">{inv.client}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(inv.date)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${statusColor[inv.status]}`}>{inv.status}</span>
                </td>
                <td className="px-4 py-3 text-right font-semibold">{formatCurrency(inv.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
