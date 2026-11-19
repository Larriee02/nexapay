import { Link } from 'react-router-dom';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { ResourceState } from '../../components/ui/Feedback';
import PageHeader from '../../components/ui/PageHeader';
import { formatCurrency } from '../../utils/format';
import { useResource } from '../../utils/useResource';

export default function Wallet() {
  const wallet = useResource('/ledger');
  return (
    <div>
      <PageHeader title="Wallet" subtitle="View your USD demo balance." />
      <ResourceState {...wallet}>
        <section className="balance-panel max-w-xl"><p>Available balance</p><strong>{formatCurrency(Number(wallet.data?.balance) / 100)}</strong><span>USD wallet · Demo funds</span></section>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="btn-primary" to="/payments"><ArrowUpRight size={18} />Send</Link>
          <Link className="btn-secondary" to="/payments?tab=receive"><ArrowDownLeft size={18} />Request</Link>
        </div>
      </ResourceState>
    </div>
  );
}
