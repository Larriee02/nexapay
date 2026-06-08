import { Link } from 'react-router-dom';
import { DollarSign, FileText, RotateCcw, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import { MERCHANT_INVOICES } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

const revenueData = [
  { week: 'W1', revenue: 4200 },
  { week: 'W2', revenue: 5100 },
  { week: 'W3', revenue: 3800 },
  { week: 'W4', revenue: 6200 },
];

export default function MerchantDashboard() {
  const pending = MERCHANT_INVOICES.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0);

  return (
    <div>
      <PageHeader title="Merchant Dashboard" subtitle="Overview of your business payments" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue (May)" value={formatCurrency(19300)} change="+15.2%" icon={DollarSign} />
        <StatCard label="Pending" value={formatCurrency(pending)} icon={FileText} />
        <StatCard label="Refunds" value="2 active" icon={RotateCcw} />
        <StatCard label="Growth" value="+22%" icon={TrendingUp} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="font-display font-semibold">Weekly revenue</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="flex justify-between">
            <h3 className="font-display font-semibold">Recent invoices</h3>
            <Link to="/merchant/invoices" className="text-sm text-nexa-500">View all</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {MERCHANT_INVOICES.map((inv) => (
              <li key={inv.id} className="flex justify-between text-sm">
                <span>{inv.client}</span>
                <span className="font-semibold">{formatCurrency(inv.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
