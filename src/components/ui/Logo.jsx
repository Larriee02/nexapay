import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', to = '/' }) {
  return (
    <Link to={to} className={`inline-flex w-fit items-center gap-2.5 font-display text-xl font-semibold tracking-tight ${className}`}>
      <span className="brand-mark"><ArrowUpRight size={23} strokeWidth={2.6} aria-hidden="true" /></span>
      NexaPay
    </Link>
  );
}
