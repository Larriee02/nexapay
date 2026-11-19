import { Navigate, useLocation } from 'react-router-dom';
import { Feedback } from '../ui/Feedback';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading, sessionError, retrySession } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-8" role="status">Loading your workspace…</div>;
  if (sessionError) return <div className="mx-auto max-w-lg space-y-4 p-8"><Feedback error={sessionError} /><button className="btn-secondary" onClick={retrySession}>Retry connection</button></div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    const fallback = user.role === 'merchant' ? '/merchant' : user.role === 'admin' ? '/admin' : '/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return children;
}
