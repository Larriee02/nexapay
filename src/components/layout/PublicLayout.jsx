import { Outlet, Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 z-50 w-full border-b border-orange-100/60 bg-white/80 backdrop-blur-xl dark:bg-slate-950/80 dark:border-slate-800/50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex">
            <a href="/#features" className="text-sm font-medium text-slate-600 hover:text-nexa-500 dark:text-slate-300 transition-colors">Features</a>
            <a href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-nexa-500 dark:text-slate-300 transition-colors">How it works</a>
            <a href="/#faq" className="text-sm font-medium text-slate-600 hover:text-nexa-500 dark:text-slate-300 transition-colors">FAQ</a>
            <Link to="/knowledge-base" className="text-sm font-medium text-slate-600 hover:text-nexa-500 dark:text-slate-300 transition-colors">Help</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="btn-secondary hidden sm:inline-flex">Log in</Link>
            <Link to="/signup" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="border-t border-stone-200 bg-stone-900 py-12 text-stone-300 dark:border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 md:grid-cols-5">
          <div>
            <Logo className="text-white [&_span:last-child]:text-white" />
            <p className="mt-3 text-sm text-stone-400">Smart payments for the modern world.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Product</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/#features" className="hover:text-orange-300 transition-colors">Features</a></li>
              <li><a href="/#how-it-works" className="hover:text-orange-300 transition-colors">How it works</a></li>
              <li><Link to="/security" className="hover:text-orange-300 transition-colors">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-orange-300 transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-orange-300 transition-colors">Terms</Link></li>
              <li><Link to="/contact" className="hover:text-orange-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/knowledge-base" className="hover:text-orange-300 transition-colors">Knowledge Base</Link></li>
              <li><Link to="/contact" className="hover:text-orange-300 transition-colors">Contact Us</Link></li>
              <li><a href="mailto:support@nexapay.com" className="hover:text-orange-300 transition-colors">Email Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Account</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-orange-300 transition-colors">Log in</Link></li>
              <li><Link to="/signup" className="hover:text-orange-300 transition-colors">Sign up</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-stone-500">© {new Date().getFullYear()} NexaPay. All rights reserved.</p>
      </footer>
    </div>
  );
}
