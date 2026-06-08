import { motion } from 'framer-motion';

export default function StatCard({ label, value, change, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold">{value}</p>
          {change && (
            <p className={`mt-1 text-xs font-medium ${change.startsWith('+') ? 'text-emerald-500' : change.startsWith('-') ? 'text-red-500' : 'text-slate-500'}`}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-xl bg-nexa-500/10 p-3 text-nexa-500">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
