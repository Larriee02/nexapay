import { useState } from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { api } from '../../utils/api';
import { useResource } from '../../utils/useResource';
import { Feedback, ResourceState } from './Feedback';
import PageHeader from './PageHeader';

const statuses = ['open', 'in-progress', 'resolved', 'closed'];
const categories = ['billing', 'technical', 'account', 'security', 'other'];

export default function TicketWorkspace({ admin = false }) {
  const tickets = useResource('/tickets');
  const [selectedId, setSelectedId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [notice, setNotice] = useState({});
  const [busy, setBusy] = useState(false);
  const visible = tickets.data?.filter((ticket) => filter === 'all' || ticket.status === filter) ?? [];
  const selected = tickets.data?.find((ticket) => ticket.id === selectedId);

  async function save(path, method, body, onSuccess) {
    setBusy(true);
    setNotice({});
    try {
      const result = await api(path, { method, body });
      onSuccess?.(result);
      tickets.refresh();
    } catch (error) {
      setNotice({ error: error.message });
    } finally {
      setBusy(false);
    }
  }

  function create(event) {
    event.preventDefault();
    save('/tickets', 'POST', Object.fromEntries(new FormData(event.currentTarget)), ({ id }) => {
      setFilter('all');
      setSelectedId(id);
      setShowForm(false);
      setNotice({ message: 'Ticket created.' });
    });
  }

  function reply(event) {
    event.preventDefault();
    const form = event.currentTarget;
    save(`/tickets/${selected.id}/messages`, 'POST', Object.fromEntries(new FormData(form)), () => {
      form.reset();
      setNotice({ message: 'Reply sent.' });
    });
  }

  return (
    <div>
      <PageHeader title={admin ? 'Support queue' : 'Support'} subtitle={admin ? 'Review tickets and reply to customers.' : 'Ask for help and follow your conversations.'} />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="segment-bar" aria-label="Filter tickets">
          {['all', ...statuses].map((status) => <button className="segment capitalize" key={status} aria-pressed={status === filter} onClick={() => setFilter(status)}>{status.replace('-', ' ')}</button>)}
        </div>
        {!admin && <button className="btn-primary" onClick={() => { setShowForm(!showForm); setNotice({}); }}><Plus size={17} />{showForm ? 'Cancel' : 'New ticket'}</button>}
      </div>
      <div className="mb-4"><Feedback {...notice} /></div>
      {showForm && (
        <form className="card mb-5 max-w-2xl space-y-4" onSubmit={create}>
          <h2 className="section-title">Create a ticket</h2>
          <label className="field-label">Title<input className="input-field" name="title" maxLength={120} required /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-label">Category<select className="input-field capitalize" name="category">{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="field-label">Priority<select className="input-field capitalize" name="priority" defaultValue="medium">{['low', 'medium', 'high'].map((priority) => <option key={priority}>{priority}</option>)}</select></label>
          </div>
          <label className="field-label">Description<textarea className="input-field" name="description" rows={4} maxLength={4000} required /></label>
          <button className="btn-primary" disabled={busy}>Submit ticket</button>
        </form>
      )}
      <ResourceState {...tickets}>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(250px,1fr)_minmax(0,1.5fr)]">
          <section className="card">
            <h2 className="section-title">{admin ? 'Tickets' : 'Your tickets'}</h2>
            {!visible.length && <p className="mt-4 text-sm text-slate-500">No tickets match this filter.</p>}
            <div className="mt-4 space-y-2">
              {visible.map((ticket) => (
                <button key={ticket.id} className="ticket-row" aria-pressed={ticket.id === selectedId} onClick={() => { setSelectedId(ticket.id); setNotice({}); }}>
                  <span className="icon-tile"><MessageSquare size={16} /></span>
                  <span className="min-w-0"><strong className="block truncate text-sm">{ticket.title}</strong><span className="text-xs capitalize text-slate-500">{ticket.status.replace('-', ' ')} · {ticket.priority} priority</span></span>
                </button>
              ))}
            </div>
          </section>
          {selected && (
            <section className="card min-w-0 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="section-title break-words">{selected.title}</h2>
                  <p className="mt-1 break-words text-xs text-slate-500">{admin && `${selected.customer_email} · `}{new Date(selected.created_at).toLocaleString()}</p>
                </div>
                {admin && <label className="field-label">Status<select className="input-field capitalize" value={selected.status} disabled={busy} onChange={(event) => save(`/tickets/${selected.id}`, 'PATCH', { status: event.target.value })}>{statuses.map((status) => <option key={status} value={status}>{status.replace('-', ' ')}</option>)}</select></label>}
              </div>
              <p className="whitespace-pre-wrap break-words text-sm">{selected.description}</p>
              {selected.messages.map((message) => (
                <article className="message-card" key={message.id}>
                  <div className="flex flex-wrap justify-between gap-2 text-xs"><strong>{message.sender}</strong><time dateTime={message.created_at} className="text-slate-500">{new Date(message.created_at).toLocaleString()}</time></div>
                  <p className="mt-2 whitespace-pre-wrap break-words text-sm">{message.body}</p>
                </article>
              ))}
              {selected.status === 'closed' ? <p className="text-sm text-slate-500">This ticket is closed.</p> : (
                <form key={selected.id} className="space-y-3" onSubmit={reply}>
                  <label className="field-label">Reply<textarea className="input-field" name="body" rows={3} maxLength={4000} required /></label>
                  <button className="btn-primary" disabled={busy}>Send reply</button>
                </form>
              )}
            </section>
          )}
        </div>
      </ResourceState>
    </div>
  );
}
