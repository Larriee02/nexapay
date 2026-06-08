import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import PageHeader from '../../components/ui/PageHeader';

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account preferences" />
      <div className="max-w-xl space-y-6">
        <div className="card space-y-4">
          <h3 className="font-semibold">Profile</h3>
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input className="input-field" defaultValue={user?.name} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input className="input-field" defaultValue={user?.email} disabled />
          </div>
          <button type="button" className="btn-primary">Save changes</button>
        </div>
        <div className="card">
          <h3 className="font-semibold">Appearance</h3>
          <div className="mt-4 flex gap-2">
            {['light', 'dark'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`rounded-xl px-4 py-2 text-sm capitalize ${theme === t ? 'bg-nexa-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold">Security</h3>
          <button type="button" className="btn-secondary mt-4">Change password</button>
          <button type="button" className="btn-secondary mt-2 ml-0 block">Enable 2FA</button>
        </div>
      </div>
    </div>
  );
}
