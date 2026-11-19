import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';

const content = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { h: 'Data we collect', p: 'The app stores your account name, email, demo wallet activity, and the messages you send to support.' },
      { h: 'How we use data', p: 'These records support sign-in, transfers, and help requests. Administrators can review account records, transfers, and support messages.' },
      { h: 'Your rights', p: 'You can update your display name in Settings. Use the contact page to request help with other account information.' },
    ],
  },
  terms: {
    title: 'Demo terms',
    sections: [
      { h: 'Demo funds', p: 'Wallet balances and transfers are simulated. They have no monetary value.' },
      { h: 'Account responsibilities', p: 'You are responsible for maintaining the security of your account credentials and all activity under your account.' },
    ],
  },
  security: {
    title: 'Security',
    sections: [
      { h: 'Passwords and sessions', p: 'NexaPay hashes passwords on the server and uses an HTTP-only cookie to identify your session.' },
      { h: 'Workspace access', p: 'The server checks account roles and limits access to wallet activity and support tickets.' },
    ],
  },
};

export default function LegalPage() {
  const { pathname } = useLocation();
  const key = pathname.replace('/', '') || 'privacy';
  const page = content[key] || content.privacy;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
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
