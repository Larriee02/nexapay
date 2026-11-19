import MonthlyActivity from '../../components/ui/MonthlyActivity';
import PageHeader from '../../components/ui/PageHeader';
import { formatCurrency } from '../../utils/format';
import { useResource } from '../../utils/useResource';

const usd = (cents) => formatCurrency(Number(cents) / 100);

export default function Analytics() {
  const activity = useResource('/ledger/monthly');
  return (
    <>
      <PageHeader title="Wallet analytics" subtitle="Demo funds sent and received over the last six calendar months." />
      <MonthlyActivity resource={activity} title="Monthly wallet activity" columns={['Sent', 'Received']} formatters={[[ 'sent', usd ], [ 'received', usd ]]} />
    </>
  );
}
