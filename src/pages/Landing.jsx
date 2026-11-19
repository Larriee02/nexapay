import { Link } from 'react-router-dom';
import { ArrowDownLeft, ArrowRight, ArrowUpRight, LifeBuoy, Wallet } from 'lucide-react';

const features = [
  [Wallet, 'A wallet you can follow', 'See your available balance and track money coming in and going out.'],
  [ArrowUpRight, 'Send and request', 'Pay another NexaPay wallet by email, or share your payment link and QR code.'],
  [LifeBuoy, 'Support in one place', 'Open a ticket and keep the conversation together in your workspace.'],
];

function WalletPreview() {
  return (
    <div className="wallet-preview" aria-label="Example NexaPay wallet">
      <div className="preview-top"><span>NexaPay wallet</span><span className="preview-label">Sample account</span></div>
      <div className="preview-balance"><span>Available balance</span><strong>$24,580.42</strong><span>USD wallet</span></div>
      <div className="preview-activity">
        <h2>Recent activity</h2>
        <div><span className="icon-tile"><ArrowDownLeft size={18} /></span><span><strong>Jamie Chen</strong><small>Received payment</small></span><b>+$120.00</b></div>
        <div><span className="icon-tile"><ArrowUpRight size={18} /></span><span><strong>Alex Morgan</strong><small>Wallet transfer</small></span><b>−$48.50</b></div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <main>
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div>
            <p className="landing-kicker"><span /> Digital wallet demo</p>
            <h1>Payments, <em>in clear view.</em></h1>
            <p className="landing-intro">Send and request payments, keep track of your balance, and get help from one NexaPay workspace.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/signup">Create an account <ArrowRight size={18} /></Link>
              <Link className="hero-secondary" to="/login">Sign in</Link>
            </div>
          </div>
          <WalletPreview />
        </div>
      </section>
      <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 sm:py-20">
        <div className="mb-8 max-w-xl"><h2 className="font-display text-4xl font-semibold tracking-tight">Your wallet, at a glance.</h2></div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(([Icon, title, body]) => (
            <article className="card" key={title}>
              <span className="icon-tile"><Icon size={22} /></span>
              <h3 className="section-title mt-5">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16">
        <div className="card flex flex-wrap items-center justify-between gap-6">
          <div><h2 className="section-title">Try a wallet transfer</h2><p className="mt-2 text-sm text-slate-500">Sign in to a seeded demo account or create a wallet and receive demo funds from another user.</p></div>
          <Link className="btn-primary" to="/login">Open NexaPay <ArrowRight size={17} /></Link>
        </div>
      </section>
      <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Questions</h2>
        <div className="mt-5 max-w-3xl space-y-3">
          <details className="card"><summary className="cursor-pointer font-semibold">Does NexaPay move real money?</summary><p className="mt-3 text-sm text-slate-500">This workspace uses simulated USD funds stored in its own wallet ledger.</p></details>
          <details className="card"><summary className="cursor-pointer font-semibold">How do I get help?</summary><p className="mt-3 text-sm text-slate-500">Open a ticket after signing in, or <Link className="font-semibold text-nexa-600 dark:text-nexa-300" to="/contact">send a message</Link> from the contact page.</p></details>
        </div>
      </section>
    </main>
  );
}
