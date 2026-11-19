CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE CHECK (email = lower(email)),
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'merchant', 'admin')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE sessions (
  token_hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users ON DELETE CASCADE,
  expires_at timestamptz NOT NULL
);
CREATE INDEX sessions_user_idx ON sessions(user_id);
CREATE INDEX sessions_expiry_idx ON sessions(expires_at);
CREATE TABLE password_resets (
  token_hash text PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES users ON DELETE CASCADE,
  expires_at timestamptz NOT NULL
);
CREATE TABLE wallets (
  user_id uuid PRIMARY KEY REFERENCES users,
  balance_cents bigint NOT NULL DEFAULT 0 CHECK (balance_cents >= 0)
);
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES wallets(user_id),
  recipient_id uuid NOT NULL REFERENCES wallets(user_id),
  request_id uuid NOT NULL,
  amount_cents bigint NOT NULL CHECK (amount_cents > 0),
  type text NOT NULL CHECK (type IN ('send', 'transfer')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (sender_id <> recipient_id),
  UNIQUE (sender_id, request_id)
);
CREATE INDEX payments_sent_idx ON payments(sender_id, created_at DESC);
CREATE INDEX payments_received_idx ON payments(recipient_id, created_at DESC);
CREATE TABLE tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('billing', 'technical', 'account', 'security', 'other')),
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'resolved', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX tickets_user_idx ON tickets(user_id, created_at DESC);
CREATE INDEX tickets_status_idx ON tickets(status, created_at DESC);
CREATE TABLE ticket_messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ticket_id uuid NOT NULL REFERENCES tickets ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES users,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ticket_messages_ticket_idx ON ticket_messages(ticket_id, id);
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
