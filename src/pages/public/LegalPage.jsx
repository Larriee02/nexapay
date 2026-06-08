import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';

const content = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { h: 'Data we collect', p: 'We collect information you provide directly, such as name, email, and payment details, plus usage data to improve our services.' },
      { h: 'How we use data', p: 'Your data powers account services, fraud prevention, and product improvements. We never sell personal data to third parties.' },
      { h: 'Your rights', p: 'You may access, correct, or delete your data at any time through Settings or by contacting support@nexapay.com.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      { h: 'Acceptance', p: 'By using NexaPay, you agree to these terms and our Privacy Policy.' },
      { h: 'Account responsibilities', p: 'You are responsible for maintaining the security of your account credentials and all activity under your account.' },
      { h: 'Service availability', p: 'We strive for 99.99% uptime but do not guarantee uninterrupted access. Fees are disclosed at checkout.' },
    ],
  },
  security: {
    title: 'Security',
    sections: [
      { h: 'Encryption', p: 'All data in transit uses TLS 1.3. Sensitive data at rest is encrypted with AES-256.' },
      { h: 'Authentication', p: 'We support 2FA, biometric login on mobile, and session management with automatic timeout.' },
      { h: 'Compliance', p: 'NexaPay maintains PCI DSS Level 1 certification and undergoes annual third-party audits.' },
    ],
  },
};

export default function LegalPage() {
  const { pathname } = useLocation();
  const key = pathname.replace('/', '') || 'privacy';
  const page = content[key] || content.privacy;

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 pt-32">
      <PageHeader title={page.title} />
      <div className="space-y-8">
        {page.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-xl font-semibold">{s.h}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
