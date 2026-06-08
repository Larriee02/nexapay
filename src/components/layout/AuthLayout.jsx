import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-gradient-to-br from-nexa-600 via-nexa-700 to-amber-800 p-12 lg:flex lg:flex-col lg:justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <Logo className="text-white relative z-10 [&_span:last-child]:text-white [&_span:first-child]:bg-white/20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md relative z-10"
        >
          <h2 className="font-display text-4xl font-bold text-white leading-tight">Banking reimagined for you</h2>
          <p className="mt-4 text-lg text-orange-100 leading-relaxed">
            Join millions who trust NexaPay for fast, secure, and intelligent payments.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[['2.4M+', 'Active users'], ['$4B+', 'Processed daily'], ['99.9%', 'Uptime'], ['<1s', 'Transfer speed']].map(([val, label]) => (
              <div key={label} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-display text-2xl font-bold text-white">{val}</p>
                <p className="text-sm text-orange-200 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <p className="text-sm text-orange-200/70 relative z-10">Demo: alex@demo.com / demo123</p>
      </div>
      <div className="flex flex-1 flex-col bg-amber-50/30 dark:bg-slate-950">
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Logo />
            </div>
            <Outlet />
          </div>
        </div>
        <p className="pb-6 text-center text-sm text-slate-500">
          <Link to="/" className="hover:text-nexa-500 transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
