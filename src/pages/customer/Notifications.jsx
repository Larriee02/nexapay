import PageHeader from '../../components/ui/PageHeader';
import { NOTIFICATIONS } from '../../data/mockData';

export default function Notifications() {
  return (
    <div>
      <PageHeader title="Notifications" subtitle="Stay updated on your account activity" />
      <ul className="space-y-3">
        {NOTIFICATIONS.map((n) => (
          <li
            key={n.id}
            className={`card flex gap-4 ${!n.read ? 'border-nexa-200 bg-nexa-50/50 dark:border-nexa-800 dark:bg-nexa-950/30' : ''}`}
          >
            <div className={`h-2 w-2 mt-2 rounded-full shrink-0 ${!n.read ? 'bg-nexa-500' : 'bg-transparent'}`} />
            <div className="flex-1">
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{n.message}</p>
              <p className="mt-1 text-xs text-slate-500">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
