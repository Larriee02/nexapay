import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';

const platformData = [
  { month: 'Jan', users: 2.1, volume: 0.9 },
  { month: 'Feb', users: 2.15, volume: 0.95 },
  { month: 'Mar', users: 2.2, volume: 1.0 },
  { month: 'Apr', users: 2.28, volume: 1.05 },
  { month: 'May', users: 2.35, volume: 1.12 },
  { month: 'Jun', users: 2.41, volume: 1.2 },
];

export default function AdminAnalytics() {
  return (
    <div>
      <PageHeader title="Platform Analytics" subtitle="Growth and volume metrics" />
      <div className="card">
        <h3 className="font-display font-semibold">Users (M) & Volume ($B)</h3>
        <div className="mt-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={2} name="Users (M)" />
              <Line type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={2} name="Volume ($B)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
