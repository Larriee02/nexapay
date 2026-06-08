import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import { ADMIN_ANALYTICS, FRAUD_ALERTS } from '../../data/mockData';
import { Users, DollarSign, Shield, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const icons = [Users, DollarSign, Shield, Store];

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Platform-wide overview and controls" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_ANALYTICS.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} change={s.change} icon={icons[i]} delay={i * 0.05} />
        ))}
      </div>
      <div className="mt-8 card">
        <div className="flex justify-between">
          <h3 className="font-display font-semibold">Recent fraud alerts</h3>
          <Link to="/admin/fraud" className="text-sm text-nexa-500">View all</Link>
        </div>
        <ul className="mt-4 space-y-3">
          {FRAUD_ALERTS.map((f) => (
            <li key={f.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
              <div>
                <p className="font-medium">{f.user}</p>
                <p className="text-xs text-slate-500">{f.type} · {f.time}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                f.risk === 'high' ? 'bg-red-100 text-red-700' : f.risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {f.risk}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
