import { useState } from 'react';
import { Feedback, ResourceState } from '../../components/ui/Feedback';
import PageHeader from '../../components/ui/PageHeader';
import { api } from '../../utils/api';
import { useResource } from '../../utils/useResource';

export default function Inbox() {
  const messages = useResource('/admin/inbox');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');

  async function markRead(id) {
    setBusy(id);
    setError('');
    try {
      await api(`/admin/inbox/${id}`, { method: 'PATCH' });
      messages.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy('');
    }
  }

  return (
    <div>
      <PageHeader title="Contact inbox" subtitle="Read messages submitted through the public contact form." />
      <Feedback error={error} />
      <ResourceState {...messages}>
        <div className="space-y-4">
          {!messages.data?.length && <p className="card text-sm text-slate-500">No contact messages yet.</p>}
          {messages.data?.map((message) => (
            <article key={message.id} className="card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="section-title break-words">{message.subject}</h2>
                  <p className="mt-1 break-words text-sm text-slate-500">{message.name} · {message.email} · {new Date(message.created_at).toLocaleString()}</p>
                </div>
                {message.read_at ? <span className="text-sm text-slate-500">Read</span> : <button className="btn-secondary" disabled={busy === message.id} onClick={() => markRead(message.id)}>Mark as read</button>}
              </div>
              <p className="mt-4 whitespace-pre-wrap break-words text-sm">{message.body}</p>
            </article>
          ))}
        </div>
      </ResourceState>
    </div>
  );
}
