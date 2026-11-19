import MonthlyActivity from '../../components/ui/MonthlyActivity';
import PageHeader from '../../components/ui/PageHeader';
import { formatCurrency } from '../../utils/format';
import { useResource } from '../../utils/useResource';

export default function AdminAnalytics() {
  const activity = useResource('/admin/monthly');
  return (
    <>
      <PageHeader title="Platform analytics" subtitle="Account registrations and demo transfers over the last six calendar months." />
      <MonthlyActivity resource={activity} title="Monthly platform activity" columns={['New accounts', 'Transfer volume']} formatters={[[ 'accounts', (count) => Number(count).toLocaleString() ], [ 'volume', (cents) => formatCurrency(Number(cents) / 100) ]]} />
    </>
  );
}
