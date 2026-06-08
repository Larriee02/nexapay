import { useState } from 'react';
import { Plus, Clock, MessageCircle } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { SUPPORT_TICKETS } from '../../data/mockData';

export default function Support() {
  const [tickets, setTickets] = useState(SUPPORT_TICKETS);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'billing',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `t${Math.random().toString(36).substr(2, 9)}`,
      ...formData,
      status: 'open',
      created: new Date().toLocaleDateString(),
      messages: [],
      responses: 0
    };
    setTickets([newTicket, ...tickets]);
    setFormData({ title: '', description: '', category: 'billing', priority: 'medium' });
    setShowNewTicket(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      closed: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
    };
    return colors[status] || colors.open;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      low: '🔵',
      medium: '🟡',
      high: '🔴'
    };
    return icons[priority] || '🔵';
  };

  return (
    <div>
      <PageHeader title="Support Tickets" subtitle="Track your support requests" />

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="card">
          <p className="text-sm text-slate-600 dark:text-slate-400">Open Tickets</p>
          <p className="text-2xl font-bold">{tickets.filter(t => t.status === 'open').length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-600 dark:text-slate-400">In Progress</p>
          <p className="text-2xl font-bold">{tickets.filter(t => t.status === 'in-progress').length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-600 dark:text-slate-400">Resolved</p>
          <p className="text-2xl font-bold">{tickets.filter(t => t.status === 'resolved').length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-600 dark:text-slate-400">Avg Response Time</p>
          <p className="text-2xl font-bold">2h</p>
        </div>
      </div>

      <button
        onClick={() => setShowNewTicket(true)}
        className="btn-primary mb-6 flex items-center gap-2"
      >
        <Plus className="h-4 w-4" /> New Ticket
      </button>

      {showNewTicket && (
        <div className="card mb-8 border-nexa-300 bg-nexa-50 dark:bg-nexa-950 dark:border-nexa-800">
          <h3 className="mb-4 font-semibold text-lg">Create Support Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="input-field"
                placeholder="Brief description of your issue"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="input-field"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="billing">Billing</option>
                <option value="technical">Technical</option>
                <option value="account">Account</option>
                <option value="security">Security</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                className="input-field"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="input-field min-h-[120px]"
                placeholder="Describe your issue in detail"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">Submit Ticket</button>
              <button
                type="button"
                onClick={() => setShowNewTicket(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)}
            className="card cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">{getPriorityIcon(ticket.priority)}</span>
                  <h4 className="font-semibold">{ticket.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{ticket.description}</p>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span>ID: {ticket.id}</span>
                  <span>Category: {ticket.category}</span>
                  <span>Created: {ticket.created}</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> {ticket.responses} responses
                  </span>
                </div>
              </div>
              <Clock className="h-4 w-4 text-slate-400 mt-1" />
            </div>

            {selectedTicket?.id === ticket.id && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mb-4 max-h-[200px] overflow-y-auto">
                  {ticket.messages && ticket.messages.length > 0 ? (
                    ticket.messages.map((msg, i) => (
                      <div key={i} className="mb-3 text-sm">
                        <p className="font-medium text-slate-700 dark:text-slate-300">{msg.sender}</p>
                        <p className="text-slate-600 dark:text-slate-400">{msg.text}</p>
                        <p className="text-xs text-slate-500 mt-1">{msg.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No messages yet. Support team will respond soon.</p>
                  )}
                </div>
                <textarea
                  className="input-field text-sm"
                  placeholder="Add a reply..."
                  rows="3"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
