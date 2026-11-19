import { Link } from 'react-router-dom';
import { ArrowLeftRight, ArrowRight, Inbox, LifeBuoy, Users } from 'lucide-react';
import { ResourceState } from '../../components/ui/Feedback';
import PageHeader from '../../components/ui/PageHeader';
import { formatCurrency } from '../../utils/format';
import { useResource } from '../../utils/useResource';

const metrics = [
  ['users', 'Accounts', Users, '/admin/users'],
  ['payments', 'Wallet transfers', ArrowLeftRight, '#transfers'],
  ['active_tickets', 'Active tickets', LifeBuoy, '/admin/support'],
  ['unread_messages', 'Unread messages', Inbox, '/admin/inbox'],
];

export default function AdminDashboard() {
  const overview = useResource('/admin');

  return (
    <div>
      <PageHeader title="Admin overview" subtitle="Monitor accounts, wallet activity, and incoming support." />
      <ResourceState {...overview}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([key, label, Icon, to]) => (
            <Link className="card metric-card" key={key} to={to} onClick={key === 'payments' ? () => document.getElementById('transfers')?.scrollIntoView() : undefined}>
              <div className="flex items-center justify-between"><span className="icon-tile"><Icon size={19} /></span><ArrowRight size={17} className="opacity-50" /></div>
              <strong>{overview.data?.summary[key]}</strong>
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <section id="transfers" className="card mt-5 scroll-mt-24">
          <h2 className="section-title">Recent wallet transfers</h2>
          {overview.data?.payments.length ? (
            <div className="mt-3 overflow-x-auto">
              <table className="data-table">
                <thead><tr><th scope="col">Sender</th><th scope="col">Recipient</th><th scope="col">Date</th><th scope="col">Amount</th></tr></thead>
                <tbody>{overview.data.payments.map((payment) => <tr key={payment.id}><td>{payment.sender}</td><td>{payment.recipient}</td><td>{new Date(payment.created_at).toLocaleDateString()}</td><td>{formatCurrency(Number(payment.amount_cents) / 100)}</td></tr>)}</tbody>
              </table>
            </div>
          ) : <p className="mt-4 text-sm text-slate-500">No wallet transfers yet.</p>}
        </section>
      </ResourceState>
    </div>
  );
}
