export const DEMO_USERS = [
  { id: 'u1', email: 'alex@demo.com', password: 'demo123', role: 'customer', name: 'Alex Morgan', avatar: 'AM' },
  { id: 'u2', email: 'biz@demo.com', password: 'demo123', role: 'merchant', name: 'Biz Corp', avatar: 'BC' },
  { id: 'u3', email: 'admin@demo.com', password: 'demo123', role: 'admin', name: 'Admin User', avatar: 'AD' },
];

export const STATS = [
  { label: 'Active Users', value: '2.4M+', icon: 'users' },
  { label: 'Transactions', value: '$12.7B', icon: 'trending' },
  { label: 'Countries', value: '120+', icon: 'globe' },
  { label: 'Uptime', value: '99.99%', icon: 'shield' },
];

export const FEATURES = [
  { title: 'Instant Transfers', desc: 'Send money globally in seconds with zero hidden fees.', icon: 'zap' },
  { title: 'Smart Analytics', desc: 'AI powered insights into spending and cash flow.', icon: 'chart' },
  { title: 'Virtual Cards', desc: 'We issue unlimited virtual cards with spending controls.', icon: 'card' },
  { title: 'Bill Pay', desc: 'Schedule and automate recurring bill payments.', icon: 'receipt' },
  { title: 'QR Payments', desc: 'Accept and send payments via secure QR codes.', icon: 'qr' },
  { title: 'Fraud Shield', desc: 'Real-time monitoring with ML fraud detection.', icon: 'shield' },
];

export const HOW_IT_WORKS = [
  { step: 1, title: 'Create Account', desc: 'Sign up in under 2 minutes with email verification.' },
  { step: 2, title: 'Fund Wallet', desc: 'Link your bank or card to add funds instantly.' },
  { step: 3, title: 'Pay & Grow', desc: 'Send, receive, and track every transaction.' },
];

export const PRICING = [
  { name: 'Starter', price: 0, features: ['5 transfers/mo', 'Basic analytics', 'Email support'], popular: false },
  { name: 'Pro', price: 9.99, features: ['Unlimited transfers', 'Virtual cards', 'Priority support', 'Bill pay'], popular: true },
  { name: 'Business', price: 29.99, features: ['Everything in Pro', 'Invoicing', 'API access', 'Dedicated manager'], popular: false },
];

export const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Freelancer', text: 'NexaPay transformed how I invoice clients. I receive payments same day since I started using NexaPay', rating: 5 },
  { name: 'Marcus Johnson', role: 'Store Owner', text: 'QR checkout increased our conversion by 34%. Setup took 10 minutes. We noticed a positive change in our payment processing whereby it improved significantly.', rating: 5 },
  { name: 'Elena Rodriguez', role: 'CFO, TechStart', text: 'The analytics dashboard gives our finance team exactly what they need.', rating: 5 },
];

export const FAQ = [
  { q: 'Is NexaPay secure?', a: 'Yes. We use bank grade encryption, 2FA, and continuous fraud monitoring.' },
  { q: 'What countries are supported?', a: 'We operate in 120+ countries with local currency support.' },
  { q: 'How fast are transfers?', a: 'Domestic transfers are instant; international typically arrive within 24 hours.' },
];

export const TRANSACTIONS = [
  { id: 't1', type: 'send', name: 'Coffee Shop', amount: -4.5, date: '2026-05-31', status: 'completed', category: 'Food' },
  { id: 't2', type: 'receive', name: 'John Smith', amount: 250, date: '2026-05-30', status: 'completed', category: 'Transfer' },
  { id: 't3', type: 'bill', name: 'Electric Co', amount: -89.2, date: '2026-05-28', status: 'completed', category: 'Utilities' },
  { id: 't4', type: 'transfer', name: 'Savings', amount: -500, date: '2026-05-27', status: 'completed', category: 'Savings' },
  { id: 't5', type: 'receive', name: 'Payroll', amount: 3200, date: '2026-05-25', status: 'completed', category: 'Income' },
  { id: 't6', type: 'send', name: 'Netflix', amount: -15.99, date: '2026-05-24', status: 'completed', category: 'Entertainment' },
  { id: 't7', type: 'scheduled', name: 'Rent', amount: -1200, date: '2026-06-01', status: 'pending', category: 'Housing' },
];

export const CARDS = [
  { id: 'c1', type: 'virtual', last4: '4242', brand: 'Visa', limit: 5000, spent: 1240, color: 'from-nexa-500 to-nexa-700' },
  { id: 'c2', type: 'physical', last4: '8888', brand: 'Mastercard', limit: 10000, spent: 3890, color: 'from-violet-500 to-purple-700' },
];

export const BILLS = [
  { id: 'b1', name: 'Electricity', amount: 89.2, due: '2026-06-05', status: 'upcoming', autopay: true },
  { id: 'b2', name: 'Internet', amount: 59.99, due: '2026-06-10', status: 'upcoming', autopay: false },
  { id: 'b3', name: 'Insurance', amount: 145, due: '2026-06-15', status: 'upcoming', autopay: true },
];

export const NOTIFICATIONS = [
  { id: 'n1', title: 'Payment received', message: 'You received $250 from John Smith', time: '2h ago', read: false },
  { id: 'n2', title: 'Card used', message: 'Virtual card •••• 4242 charged $4.50', time: '5h ago', read: false },
  { id: 'n3', title: 'Bill reminder', message: 'Electric bill due in 5 days', time: '1d ago', read: true },
];

export const CHART_DATA = [
  { month: 'Jan', income: 4200, expense: 3100 },
  { month: 'Feb', income: 4500, expense: 2800 },
  { month: 'Mar', income: 4100, expense: 3500 },
  { month: 'Apr', income: 5200, expense: 3200 },
  { month: 'May', income: 4800, expense: 2900 },
  { month: 'Jun', income: 5500, expense: 3100 },
];

export const SPENDING_CATEGORIES = [
  { name: 'Food', value: 420, color: '#0ea5e9' },
  { name: 'Housing', value: 1200, color: '#8b5cf6' },
  { name: 'Transport', value: 280, color: '#f59e0b' },
  { name: 'Entertainment', value: 150, color: '#ec4899' },
  { name: 'Other', value: 310, color: '#64748b' },
];

export const MERCHANT_INVOICES = [
  { id: 'inv1', client: 'Acme Corp', amount: 2400, status: 'paid', date: '2026-05-28' },
  { id: 'inv2', client: 'Design Studio', amount: 850, status: 'pending', date: '2026-05-30' },
  { id: 'inv3', client: 'Local Cafe', amount: 320, status: 'overdue', date: '2026-05-15' },
];

export const MERCHANT_REFUNDS = [
  { id: 'r1', customer: 'Jane Doe', amount: 45, reason: 'Duplicate charge', status: 'processed', date: '2026-05-29' },
  { id: 'r2', customer: 'Mike Lee', amount: 120, reason: 'Product return', status: 'pending', date: '2026-05-30' },
];

export const ADMIN_USERS = [
  { id: 'u1', name: 'Alex Morgan', email: 'alex@demo.com', role: 'customer', status: 'active', joined: '2025-01-15' },
  { id: 'u4', name: 'Jane Doe', email: 'jane@example.com', role: 'customer', status: 'active', joined: '2025-03-20' },
  { id: 'u5', name: 'Tech Store', email: 'store@biz.com', role: 'merchant', status: 'active', joined: '2025-02-10' },
  { id: 'u6', name: 'Bob Wilson', email: 'bob@test.com', role: 'customer', status: 'suspended', joined: '2024-11-05' },
];

export const FRAUD_ALERTS = [
  { id: 'f1', user: 'bob@test.com', type: 'Velocity', risk: 'high', amount: 4500, time: '2026-05-31 09:12' },
  { id: 'f2', user: 'unknown@mail.com', type: 'Geo mismatch', risk: 'medium', amount: 890, time: '2026-05-30 22:45' },
  { id: 'f3', user: 'jane@example.com', type: 'Unusual pattern', risk: 'low', amount: 200, time: '2026-05-30 14:20' },
];

export const ADMIN_ANALYTICS = [
  { label: 'Total Users', value: '2,412,890', change: '+12.4%' },
  { label: 'Volume (30d)', value: '$1.2B', change: '+8.2%' },
  { label: 'Fraud Blocked', value: '$2.4M', change: '-3.1%' },
  { label: 'Active Merchants', value: '48,291', change: '+5.7%' },
];

export const CONTACT_INFO = {
  email: 'support@nexapay.com',
  phone: '+1 (800) 555-0199',
  address: '100 Fintech Plaza, San Francisco, CA 94105',
};

export const SUPPORT_TICKETS = [
  {
    id: 'ticket_001',
    title: 'Payment not received',
    description: 'I sent $500 to my friend 2 days ago but they haven\'t received it yet.',
    status: 'in-progress',
    category: 'billing',
    priority: 'high',
    created: '2026-06-04',
    customerEmail: 'alex@demo.com',
    responses: 2,
    messages: [
      {
        sender: 'Customer',
        text: 'I sent $500 to my friend 2 days ago but they haven\'t received it yet.',
        time: '2h ago'
      },
      {
        sender: 'Support Team',
        text: 'I\'m sorry to hear that. Let me look into this for you. Can you provide the transaction ID?',
        time: '1h ago'
      },
      {
        sender: 'Customer',
        text: 'Sure, it\'s TXN-789456123',
        time: '30min ago'
      }
    ]
  },
  {
    id: 'ticket_002',
    title: 'Unable to add card',
    description: 'I\'m getting an error when trying to add my credit card. Error code: 4001',
    status: 'open',
    category: 'technical',
    priority: 'high',
    created: '2026-06-05',
    customerEmail: 'user@example.com',
    responses: 0,
    messages: []
  },
  {
    id: 'ticket_003',
    title: 'Account security question',
    description: 'I notice unusual login activity. Should I be concerned? Do I need to change my password?',
    status: 'resolved',
    category: 'security',
    priority: 'high',
    created: '2026-06-02',
    customerEmail: 'jane@demo.com',
    responses: 3,
    messages: [
      {
        sender: 'Customer',
        text: 'I notice unusual login activity. Should I be concerned?',
        time: '3d ago'
      },
      {
        sender: 'Support Team',
        text: 'Thanks for alerting us. We\'ve already blocked those attempts. Please change your password for extra security.',
        time: '2d ago'
      }
    ]
  },
  {
    id: 'ticket_004',
    title: 'Billing inquiry',
    description: 'I was charged twice for my Pro subscription. Can this be refunded?',
    status: 'resolved',
    category: 'billing',
    priority: 'medium',
    created: '2026-06-01',
    customerEmail: 'merchant@biz.com',
    responses: 4,
    messages: [
      {
        sender: 'Support Team',
        text: 'We\'ve identified the duplicate charge and refunded $9.99 to your account. The refund should appear within 24 hours.',
        time: '1d ago'
      }
    ]
  },
  {
    id: 'ticket_005',
    title: 'How to enable 2FA',
    description: 'Can you help me set up two-factor authentication on my account?',
    status: 'resolved',
    category: 'account',
    priority: 'medium',
    created: '2026-05-30',
    customerEmail: 'support@test.com',
    responses: 2,
    messages: []
  }
];

export const KNOWLEDGE_BASE = {
  billing: [
    {
      id: 'kb_001',
      title: 'How do I view my billing history?',
      description: 'Access and track all your transactions and charges',
      icon: '💳',
      content: 'You can view your complete billing history by navigating to Settings > Billing. Here you\'ll find all transactions, subscriptions, and payments.',
      note: 'Billing history is available for the last 24 months.'
    },
    {
      id: 'kb_002',
      title: 'What are the fees?',
      description: 'Understanding NexaPay\'s transparent fee structure',
      icon: '💰',
      content: 'NexaPay offers transparent pricing with no hidden fees. Standard transfers cost 1.5% or $0.99 (whichever is lower). International transfers are 2.5%. Premium members enjoy unlimited transfers with no fees.',
      note: 'Fees may vary by region and transfer type.'
    },
    {
      id: 'kb_003',
      title: 'How do I get refunded?',
      description: 'Process for requesting and receiving refunds',
      icon: '↩️',
      content: 'To request a refund, go to your transaction history, select the transaction, and click "Request Refund". Refunds typically process within 3-5 business days.',
      steps: [
        'Go to Dashboard > Transactions',
        'Find the transaction you want to refund',
        'Click the transaction and select "Request Refund"',
        'Enter the reason and submit',
        'Our team will review and process within 3-5 days'
      ]
    }
  ],
  account: [
    {
      id: 'kb_004',
      title: 'How to update my profile information',
      description: 'Change your name, email, and personal details',
      icon: '👤',
      content: 'Visit Settings > Profile to update your personal information. Some changes like email address may require verification for security purposes.',
      note: 'Please allow 24 hours for email changes to take effect.'
    },
    {
      id: 'kb_005',
      title: 'How to enable two-factor authentication',
      description: 'Add an extra layer of security to your account',
      icon: '🔐',
      content: 'Go to Settings > Security > Two-Factor Authentication and choose between SMS or authenticator app. Follow the prompts to complete setup.',
      steps: [
        'Go to Settings > Security',
        'Click "Enable Two-Factor Authentication"',
        'Choose SMS or Authenticator App',
        'Scan the QR code with your authenticator app',
        'Enter the code to verify'
      ],
      note: '2FA is highly recommended for all accounts.'
    },
    {
      id: 'kb_006',
      title: 'How to delete my account',
      description: 'Permanently close your NexaPay account',
      icon: '🗑️',
      content: 'Go to Settings > Account > Delete Account. Please note that account deletion is permanent and cannot be reversed. All your data will be securely deleted.',
      note: 'Ensure you have no pending transactions before deleting your account.'
    }
  ],
  technical: [
    {
      id: 'kb_007',
      title: 'Why is my payment pending?',
      description: 'Understanding payment statuses and timelines',
      icon: '⏳',
      content: 'Payments can be pending for several reasons: network delays, verification processes, or the recipient bank\'s processing time. Most payments complete within 24 hours. International transfers may take longer.',
      note: 'If a payment is pending for more than 48 hours, contact our support team.'
    },
    {
      id: 'kb_008',
      title: 'I\'m having trouble logging in',
      description: 'Troubleshooting login issues and password resets',
      icon: '🔑',
      content: 'If you can\'t log in, try these steps: 1) Clear your browser cache, 2) Try a different browser, 3) Use "Forgot Password" to reset, 4) Check if your account is locked.',
      steps: [
        'Clear browser cache and cookies',
        'Try using a different browser or device',
        'Use the "Forgot Password" link to reset',
        'Check if your account has been locked due to multiple failed attempts',
        'Contact support if issues persist'
      ]
    },
    {
      id: 'kb_009',
      title: 'Error codes and what they mean',
      description: 'Understanding common error messages',
      icon: '⚠️',
      content: 'Error 4001: Card declined. Error 4002: Insufficient funds. Error 5000: Server error. Error 1001: Invalid card details. Contact support if you need more help.',
      note: 'Most errors can be resolved by checking your information or trying again later.'
    }
  ],
  security: [
    {
      id: 'kb_010',
      title: 'Is my data secure?',
      description: 'Understanding NexaPay security features',
      icon: '🛡️',
      content: 'Yes. We use bank-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit. All servers are protected by advanced firewalls and undergo regular security audits.',
      note: 'We maintain PCI DSS Level 1 certification.'
    },
    {
      id: 'kb_011',
      title: 'What should I do if my account is compromised?',
      description: 'Steps to take if you suspect unauthorized access',
      icon: '🚨',
      content: 'Immediately change your password from a different device, enable 2FA, and contact our support team. Review recent transactions and dispute any unauthorized charges.',
      steps: [
        'Change your password immediately',
        'Enable 2FA if not already active',
        'Review recent transactions',
        'Dispute any unauthorized transactions',
        'Contact support team for assistance'
      ]
    }
  ]
};

