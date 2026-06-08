import PageHeader from '../../components/ui/PageHeader';
import { MERCHANT_REFUNDS } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/format';

export default function Refunds() {
  return (
    <div>
      <PageHeader title="Refunds" subtitle="Process and track customer refunds" />
      <div className="space-y-4">
        {MERCHANT_REFUNDS.map((r) => (
          <div key={r.id} className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{r.customer}</p>
              <p className="text-sm text-slate-500">{r.reason} · {formatDate(r.date)}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">{formatCurrency(r.amount)}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${r.status === 'processed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {r.status}
              </span>
              {r.status === 'pending' && <button type="button" className="btn-primary text-xs">Approve</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
