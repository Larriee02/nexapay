import PageHeader from '../../components/ui/PageHeader';
import { FRAUD_ALERTS } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

export default function Fraud() {
  return (
    <div>
      <PageHeader title="Fraud Detection" subtitle="Sample alerts · Automated monitoring is unavailable" />
      <div className="space-y-4">
        {FRAUD_ALERTS.map((f) => (
          <div key={f.id} className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{f.user}</p>
              <p className="text-sm text-slate-500">{f.type} · {f.time}</p>
              <p className="mt-1 text-lg font-bold">{formatCurrency(f.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
