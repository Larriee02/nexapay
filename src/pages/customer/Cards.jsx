import { motion } from 'framer-motion';
import { Plus, Lock, Eye } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { CARDS } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

export default function Cards() {
  return (
    <div>
      <PageHeader
        title="Cards"
        subtitle="Manage virtual and physical cards"
        action={<button type="button" className="btn-primary"><Plus className="h-4 w-4" /> New card</button>}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, rotate: -2 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative aspect-[1.6/1] overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white shadow-xl`}
          >
            <p className="text-sm opacity-80 capitalize">{card.type} · {card.brand}</p>
            <p className="mt-8 font-mono text-2xl tracking-widest">•••• •••• •••• {card.last4}</p>
            <div className="mt-6 flex justify-between text-sm">
              <span>Limit {formatCurrency(card.limit)}</span>
              <span>Spent {formatCurrency(card.spent)}</span>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button type="button" className="rounded-lg bg-white/20 p-2"><Eye className="h-4 w-4" /></button>
              <button type="button" className="rounded-lg bg-white/20 p-2"><Lock className="h-4 w-4" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
