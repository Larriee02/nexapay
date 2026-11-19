import { useState } from 'react';
import ActivityList from '../../components/ui/ActivityList';
import { ResourceState } from '../../components/ui/Feedback';
import PageHeader from '../../components/ui/PageHeader';
import { useResource } from '../../utils/useResource';

const filters = [['all', 'All activity'], ['send', 'Sent'], ['receive', 'Received'], ['transfer', 'Transfers']];

export default function Transactions() {
  const [filter, setFilter] = useState('all');
  const activity = useResource('/ledger');
  const payments = activity.data?.payments.filter((payment) => filter === 'all' || payment.type === filter) ?? [];

  return (
    <div>
      <PageHeader title="Transactions" subtitle="Review your latest wallet activity." />
      <div className="segment-bar" aria-label="Filter transactions">
        {filters.map(([id, label]) => <button key={id} className="segment" type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}
      </div>
      <div className="mt-6">
        <ResourceState {...activity}>
          <section className="card"><h2 className="section-title">Activity</h2><ActivityList payments={payments} /></section>
        </ResourceState>
      </div>
    </div>
  );
}
