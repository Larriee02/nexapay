import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CreditCard, ArrowLeftRight, BarChart3, Receipt,
  Wallet, Bell, Settings, FileText, RotateCcw, Users, ShieldAlert,
  X, LogOut, QrCode, Calendar, HelpCircle, Headphones,
} from 'lucide-react';
import Logo from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';

const customerNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/payments', label: 'Payments', icon: ArrowLeftRight },
  { to: '/cards', label: 'Cards', icon: CreditCard },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/transactions', label: 'Transactions', icon: Receipt },
  { to: '/bills', label: 'Bills', icon: FileText },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/support', label: 'Support', icon: HelpCircle },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const merchantNav = [
  { to: '/merchant', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/merchant/invoices', label: 'Invoices', icon: FileText },
  { to: '/merchant/refunds', label: 'Refunds', icon: RotateCcw },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const adminNav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/fraud', label: 'Fraud', icon: ShieldAlert },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/support', label: 'Support', icon: Headphones },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const nav = user?.role === 'merchant' ? merchantNav : user?.role === 'admin' ? adminNav : customerNav;

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
        <Logo to={user?.role === 'merchant' ? '/merchant' : user?.role === 'admin' ? '/admin' : '/dashboard'} />
        <button type="button" className="lg:hidden rounded-lg p-1" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-nexa-500 text-white shadow-md shadow-nexa-500/20'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}
        {user?.role === 'customer' && (
          <>
            <NavLink to="/payments?tab=qr" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
              <QrCode className="h-5 w-5" /> QR Pay
            </NavLink>
            <NavLink to="/payments?tab=scheduled" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
              <Calendar className="h-5 w-5" /> Scheduled
            </NavLink>
          </>
        )}
      </nav>
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-orange-50/60 p-3 dark:bg-slate-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-nexa-400 to-nexa-600 text-sm font-bold text-white">
            {user?.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {content}
      </aside>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
