import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import { CHART_DATA, SPENDING_CATEGORIES } from '../../data/mockData';

export default function Analytics() {
  return (
    <div>
      <PageHeader title="Analytics" subtitle="Insights into your spending and income" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="font-display font-semibold">Income vs Expenses</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="font-display font-semibold">Spending by category</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SPENDING_CATEGORIES} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {SPENDING_CATEGORIES.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
