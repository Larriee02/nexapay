import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Minimize2 } from 'lucide-react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'support',
      text: 'Hello! How can we help you today?',
      time: '10:30 AM',
      avatar: '👨‍💼'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '👤'
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate support response
    setTimeout(() => {
      const responses = [
        'Thank you for your message. We\'re looking into this for you.',
        'I understand. Let me check that for you.',
        'That\'s a great question! Here\'s what I can help with...',
        'I can definitely assist you with that.'
      ];
      
      const supportMessage = {
        id: messages.length + 2,
        sender: 'support',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '👨‍💼'
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-nexa-500 text-white p-4 rounded-full shadow-lg hover:bg-nexa-600 transition-all hover:scale-110 z-40 flex items-center gap-2"
        title="Open support chat"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="text-sm font-semibold hidden sm:inline">Chat with us</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-slate-900 rounded-lg shadow-2xl z-50 flex flex-col max-h-[600px] border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-nexa-500 to-nexa-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div>
          <h3 className="font-semibold">NexaPay Support</h3>
          <p className="text-xs text-nexa-100">Typically replies instantly</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-800/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}
          >
            {msg.sender === 'support' && (
              <div className="w-8 h-8 rounded-full bg-nexa-100 dark:bg-nexa-900 flex items-center justify-center shrink-0 text-lg">
                {msg.avatar}
              </div>
            )}
            <div
              className={`max-w-xs rounded-lg p-3 ${
                msg.sender === 'user'
                  ? 'bg-nexa-500 text-white rounded-br-none'
                  : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'user'
                  ? 'text-nexa-100'
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {msg.time}
              </p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center shrink-0 text-lg">
                {msg.avatar}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-nexa-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-nexa-500 text-white p-2 rounded-lg hover:bg-nexa-600 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          💬 We&apos;re available 24/7 to help you
        </p>
      </div>
    </div>
  );
}
