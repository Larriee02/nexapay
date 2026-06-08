import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import { CHART_DATA, TRANSACTIONS } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

export default function CustomerDashboard() {
  const recent = TRANSACTIONS.slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's your financial overview." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Balance" value={formatCurrency(24580.42)} icon={Wallet} delay={0} />
        <StatCard label="Income (May)" value={formatCurrency(5500)} change="+8.2%" icon={ArrowDownLeft} delay={0.05} />
        <StatCard label="Expenses (May)" value={formatCurrency(3100)} change="-4.1%" icon={ArrowUpRight} delay={0.1} />
        <StatCard label="Cards" value="2 active" icon={CreditCard} delay={0.15} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card lg:col-span-2">
          <h3 className="font-display font-semibold">Cash flow</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Area type="monotone" dataKey="income" stroke="#0ea5e9" fill="url(#income)" strokeWidth={2} />
                <Area type="monotone" dataKey="expense" stroke="#8b5cf6" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold">Quick actions</h3>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: 'Send', to: '/payments?tab=send' },
              { label: 'Receive', to: '/payments?tab=receive' },
              { label: 'Pay bill', to: '/bills' },
              { label: 'QR code', to: '/payments?tab=qr' },
            ].map((a) => (
              <Link key={a.label} to={a.to} className="rounded-xl bg-nexa-500/10 py-4 text-center text-sm font-semibold text-nexa-600 hover:bg-nexa-500/20 dark:text-nexa-400">
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 card">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold">Recent transactions</h3>
          <Link to="/transactions" className="text-sm text-nexa-500 hover:underline">View all</Link>
        </div>
        <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
          {recent.map((t) => (
            <li key={t.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-slate-500">{t.category} · {t.date}</p>
              </div>
              <span className={t.amount > 0 ? 'text-emerald-500 font-semibold' : 'font-semibold'}>
                {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
