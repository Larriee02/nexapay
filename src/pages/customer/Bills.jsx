import PageHeader from '../../components/ui/PageHeader';
import { BILLS } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/format';

export default function Bills() {
  return (
    <div>
      <PageHeader title="Bills" subtitle="Pay and manage recurring bills" action={<button type="button" className="btn-primary">Add bill</button>} />
      <div className="grid gap-4">
        {BILLS.map((b) => (
          <div key={b.id} className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">{b.name}</h3>
              <p className="text-sm text-slate-500">Due {formatDate(b.due)} · {b.autopay ? 'Autopay on' : 'Manual'}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-xl font-bold">{formatCurrency(b.amount)}</span>
              <button type="button" className="btn-primary">Pay now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
