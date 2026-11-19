import { Link } from 'react-router-dom';
import { ArrowDownLeft, ArrowRight, ArrowUpRight, CircleHelp } from 'lucide-react';
import ActivityList from '../../components/ui/ActivityList';
import { ResourceState } from '../../components/ui/Feedback';
import PageHeader from '../../components/ui/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/format';
import { useResource } from '../../utils/useResource';

const actions = [
  ['Send a payment', '/payments', ArrowUpRight],
  ['Request a payment', '/payments?tab=receive', ArrowDownLeft],
  ['Get support', '/support', CircleHelp],
];

export default function CustomerDashboard() {
  const { user } = useAuth();
  const wallet = useResource('/ledger');

  return (
    <div>
      <PageHeader title={`Welcome, ${user.name.split(' ')[0]}`} subtitle="Your wallet and recent activity." />
      <ResourceState {...wallet}>
        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <section className="balance-panel">
            <p>Available balance</p>
            <strong>{formatCurrency(Number(wallet.data?.balance) / 100)}</strong>
            <span>USD wallet · Demo funds</span>
            <Link to="/wallet" className="balance-link">View wallet <ArrowRight size={15} /></Link>
          </section>
          <section className="card">
            <h2 className="section-title">Quick actions</h2>
            <div className="mt-4 space-y-2">
              {actions.map(([label, to, Icon]) => <Link className="action-row" key={to} to={to}><span className="icon-tile"><Icon size={17} /></span>{label}<ArrowRight size={16} className="ml-auto opacity-50" /></Link>)}
            </div>
          </section>
        </div>
        <section className="card mt-5">
          <div className="flex items-center justify-between gap-4"><h2 className="section-title">Recent activity</h2><Link to="/transactions" className="text-sm font-semibold text-nexa-600 dark:text-nexa-300">All transactions</Link></div>
          <ActivityList payments={wallet.data?.payments.slice(0, 6) ?? []} />
        </section>
      </ResourceState>
    </div>
  );
}
