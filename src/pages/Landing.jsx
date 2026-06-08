import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Zap, BarChart3, CreditCard, Receipt, QrCode, Shield,
  Users, TrendingUp, Globe, ChevronDown, Star, Check,
} from 'lucide-react';
import { STATS, FEATURES, HOW_IT_WORKS, TESTIMONIALS, FAQ } from '../data/mockData';

const iconMap = { zap: Zap, chart: BarChart3, card: CreditCard, receipt: Receipt, qr: QrCode, shield: Shield, users: Users, trending: TrendingUp, globe: Globe };

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-nexa-500"
      style={{ scaleX }}
    />
  );
}

export default function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <ScrollProgress />
      <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-amber-50/30 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
        <motion.div style={{ y, opacity }} className="relative mx-auto max-w-6xl px-4 pt-24 pb-32 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-full border border-nexa-200 bg-nexa-50 px-4 py-1 text-sm font-medium text-orange-700 dark:border-nexa-800 dark:bg-nexa-950 dark:text-nexa-300"
          >
            Trusted by 2.4M+ users worldwide
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-7xl"
          >
            Payments that move at{' '}
            <span className="gradient-text">the speed of you</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400"
          >
            Send, receive, and manage money with enterprise grade security and consumer simple design.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link to="/signup" className="btn-primary text-base px-8 py-3">Get Started</Link>
            <a href="#how-it-works" className="btn-secondary text-base px-8 py-3">See how it works</a>
          </motion.div>
          
        </motion.div>
        <motion.a
          href="#stats"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.a>
      </section>

      <section id="stats" className="py-20 bg-stone-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => {
            const Icon = iconMap[s.icon] || Users;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <Icon className="mx-auto h-8 w-8 text-nexa-400" />
                <p className="mt-4 font-display text-3xl font-bold">{s.value}</p>
                <p className="mt-1 text-slate-400">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-display text-4xl font-bold"
          >
            Everything you need
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600 dark:text-slate-400">
            Powerful features designed for individuals and businesses alike.
          </p>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
              const Icon = iconMap[f.icon] || Zap;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="card hover:shadow-glow transition-shadow"
                >
                  <div className="rounded-xl bg-nexa-500/10 p-3 w-fit text-nexa-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-orange-50/60 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-4xl font-bold">How it works</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-nexa-500 font-display text-xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      <section className="py-24 bg-orange-50/60 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-4xl font-bold">Loved by users</h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-300">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 font-semibold">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center font-display text-4xl font-bold">FAQ</h2>
          <div className="mt-12 space-y-4">
            {FAQ.map((item, i) => (
              <motion.details
                key={item.q}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card group"
              >
                <summary className="cursor-pointer font-semibold list-none flex justify-between items-center">
                  {item.q}
                  <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-slate-600 dark:text-slate-400">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-orange-500 to-amber-700 px-8 py-16 text-center text-white"
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to get started?</h2>
          <p className="mt-4 text-orange-100">Join NexaPay today. No credit card required.</p>
          <Link to="/signup" className="mt-8 inline-flex rounded-xl bg-white px-8 py-3 font-semibold text-orange-700 hover:bg-orange-50">
            Create free account
          </Link>
        </motion.div>
      </section>
    </>
  );
}
