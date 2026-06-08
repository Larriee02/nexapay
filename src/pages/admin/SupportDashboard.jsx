import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { SUPPORT_TICKETS } from '../../data/mockData';

export default function SupportDashboard() {
  const [tickets, setTickets] = useState(SUPPORT_TICKETS);
  const [filter, setFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  const filteredTickets = filter === 'all' 
    ? tickets 
    : tickets.filter(t => t.status === filter);

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, status: newStatus } : t
    ));
  };

  const handleReply = (ticketId) => {
    if (!replyText.trim()) return;
    
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          messages: [
            ...t.messages,
            {
              sender: 'Support Team',
              text: replyText,
              time: new Date().toLocaleTimeString()
            }
          ],
          responses: t.responses + 1,
          status: t.status === 'open' ? 'in-progress' : t.status
        };
      }
      return t;
    }));
    setReplyText('');
  };

  const stats = [
    {
      label: 'Open Tickets',
      value: tickets.filter(t => t.status === 'open').length,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900'
    },
    {
      label: 'In Progress',
      value: tickets.filter(t => t.status === 'in-progress').length,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 dark:bg-yellow-900'
    },
    {
      label: 'Resolved',
      value: tickets.filter(t => t.status === 'resolved').length,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900'
    },
    {
      label: 'Avg Response',
      value: '45min',
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900'
    }
  ];

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
    const icons = { low: '🔵', medium: '🟡', high: '🔴' };
    return icons[priority] || '🔵';
  };

  return (
    <div>
      <PageHeader title="Support Management" subtitle="Manage customer support tickets" />

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`card ${stat.bg}`}>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'open', 'in-progress', 'resolved', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-nexa-500 text-white'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {filteredTickets.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-slate-500">No tickets found</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)}
                className={`card cursor-pointer transition-all ${selectedTicket?.id === ticket.id ? 'ring-2 ring-nexa-500' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getPriorityIcon(ticket.priority)}</span>
                      <h4 className="font-semibold text-sm">{ticket.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{ticket.description}</p>
                    <div className="flex gap-3 mt-2 text-xs text-slate-500">
                      <span>#{ticket.id}</span>
                      <span>{ticket.category}</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" /> {ticket.responses}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedTicket && (
          <div className="card">
            <h3 className="font-semibold mb-4">Ticket Details</h3>
            <div className="space-y-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 font-medium">STATUS</p>
                <select
                  value={selectedTicket.status}
                  onChange={(e) => {
                    handleStatusChange(selectedTicket.id, e.target.value);
                    setSelectedTicket({...selectedTicket, status: e.target.value});
                  }}
                  className="input-field text-sm mt-1"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">CUSTOMER</p>
                <p className="text-sm font-medium">{selectedTicket.customerEmail || 'alex@demo.com'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">CREATED</p>
                <p className="text-sm">{selectedTicket.created}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">PRIORITY</p>
                <p className="text-sm">{selectedTicket.priority.toUpperCase()}</p>
              </div>
            </div>

            <div className="border-t pt-4 dark:border-slate-700">
              <h4 className="text-sm font-semibold mb-3">Messages</h4>
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg mb-4 max-h-[200px] overflow-y-auto">
                {selectedTicket.messages && selectedTicket.messages.length > 0 ? (
                  selectedTicket.messages.map((msg, i) => (
                    <div key={i} className="mb-3 text-xs border-b dark:border-slate-700 pb-2 last:border-0">
                      <p className="font-medium text-slate-700 dark:text-slate-300">{msg.sender}</p>
                      <p className="text-slate-600 dark:text-slate-400">{msg.text}</p>
                      <p className="text-slate-500 mt-1">{msg.time}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-xs">No messages yet</p>
                )}
              </div>

              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type response..."
                className="input-field text-xs mb-3"
                rows="3"
              />
              <button
                onClick={() => handleReply(selectedTicket.id)}
                className="btn-primary w-full text-sm"
              >
                Send Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
