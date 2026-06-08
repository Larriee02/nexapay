import { Link } from 'react-router-dom';

export default function Logo({ className = '', to = '/' }) {
  return (
    <Link to={to} className={`flex items-center gap-2 font-display font-bold text-xl ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-nexa-500 text-white shadow-glow">
        N
      </span>
      <span className="gradient-text">NexaPay</span>
    </Link>
  );
}
