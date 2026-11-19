import { Link, Outlet } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[0.85fr_1fr]">
      <aside className="auth-aside hidden lg:flex">
        <Logo className="text-white" />
        <div>
          <span className="auth-symbol"><ArrowUpRight size={44} /></span>
          <h2 className="mt-6 max-w-md font-display text-6xl font-medium leading-none tracking-tight">Your wallet and payments.</h2>
          <p className="mt-5 max-w-xs text-sm leading-6 text-indigo-100">Keep your balance, recent transfers, and support conversations in one place.</p>
        </div>
        <p className="text-sm text-indigo-100">NexaPay uses demo funds.</p>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex items-center justify-between p-5 sm:p-8">
          <div className="lg:hidden"><Logo /></div>
          <Link to="/" className="hidden items-center gap-2 text-sm font-medium text-slate-500 lg:inline-flex"><ArrowLeft size={16} />Back to home</Link>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 items-center justify-center px-5 pb-16 pt-6 sm:px-10">
          <div className="w-full max-w-md"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
