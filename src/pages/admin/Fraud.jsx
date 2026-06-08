import PageHeader from '../../components/ui/PageHeader';
import { FRAUD_ALERTS } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

export default function Fraud() {
  return (
    <div>
      <PageHeader title="Fraud Detection" subtitle="Monitor and respond to suspicious activity" />
      <div className="space-y-4">
        {FRAUD_ALERTS.map((f) => (
          <div key={f.id} className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{f.user}</p>
              <p className="text-sm text-slate-500">{f.type} · {f.time}</p>
              <p className="mt-1 text-lg font-bold">{formatCurrency(f.amount)}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-secondary">Dismiss</button>
              <button type="button" className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">Block user</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
