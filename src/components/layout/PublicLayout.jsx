import { Outlet, Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Logo />
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <a href="/#features">Features</a><a href="/#how-it-works">How it works</a><Link to="/knowledge-base">Help center</Link>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="btn-secondary">Sign in</Link>
            <Link to="/signup" className="btn-primary hidden sm:inline-flex">Get started</Link>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-8">
          <Logo />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
            <Link to="/knowledge-base">Help center</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/security">Security</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
