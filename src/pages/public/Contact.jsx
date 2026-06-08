import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { CONTACT_INFO } from '../../data/mockData';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleKnowledgeBase = () => {
    navigate('/knowledge-base');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-24 pt-32">
      <PageHeader title="Contact us" subtitle="We're here to help 24/7" />

      {/* Support options */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <div className="card text-center">
          <div className="rounded-xl bg-blue-100 dark:bg-blue-900 p-4 w-fit mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          </div>
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Chat with our support team in real-time</p>
          <p className="text-xs text-slate-500">Available 24/7</p>
        </div>
        <div className="card text-center">
          <div className="rounded-xl bg-green-100 dark:bg-green-900 p-4 w-fit mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <h3 className="font-semibold mb-2">Knowledge Base</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Find answers to common questions</p>
          <button
            onClick={handleKnowledgeBase}
            className="text-sm text-nexa-500 hover:text-nexa-600 font-medium"
          >
            Browse articles →
          </button>
        </div>
        <div className="card text-center">
          <div className="rounded-xl bg-purple-100 dark:bg-purple-900 p-4 w-fit mx-auto mb-4">
            <Clock className="h-8 w-8 text-purple-600 dark:text-purple-300" />
          </div>
          <h3 className="font-semibold mb-2">Support Tickets</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Track your support requests</p>
          <p className="text-xs text-slate-500">Typical response: 2 hours</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-12">
        {/* Contact info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          {[
            { icon: Mail, label: 'Email', value: CONTACT_INFO.email },
            { icon: Phone, label: 'Phone', value: CONTACT_INFO.phone },
            { icon: MapPin, label: 'Address', value: CONTACT_INFO.address },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="card flex gap-4">
              <div className="rounded-xl bg-nexa-500/10 p-3 text-nexa-500 shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="font-medium text-slate-900 dark:text-slate-100">{value}</p>
              </div>
            </div>
          ))}
          <div className="card border-2 border-nexa-200 dark:border-nexa-800 bg-nexa-50 dark:bg-nexa-950">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              ✨ <strong>Pro tip:</strong> Check our Knowledge Base first for instant answers to common questions.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form
            className="space-y-4"
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }}
          >
            {sent ? (
              <div className="card border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 p-6 text-center">
                <p className="text-green-700 dark:text-green-300 font-medium">✓ Message sent successfully!</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">We&apos;ll get back to you within 24 hours</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input className="input-field" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="input-field" placeholder="your@email.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="input-field">
                    <option>General inquiry</option>
                    <option>Support request</option>
                    <option>Partnership</option>
                    <option>Bug report</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea className="input-field min-h-[120px]" placeholder="Tell us how we can help..." required />
                </div>
                <button type="submit" className="btn-primary w-full">Send message</button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Support options */}
      <div className="card border-2 border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold mb-4">How Can We Help?</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2">🔒 Account & Security</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Password resets, 2FA setup, account recovery, suspicious activity</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">💳 Payments & Transfers</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Transaction issues, refunds, pending payments, international transfers</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">💰 Billing & Subscriptions</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Subscription management, invoices, fee questions, plan upgrades</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">🛠️ Technical Support</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">App issues, feature questions, integration help, error codes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
