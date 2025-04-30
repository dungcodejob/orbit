import { Navigate, useLocation } from '@tanstack/react-router';
import { useAuthStore } from '../stores';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" search={{ redirect: location.pathname }} replace />;
  }

  return <>{children}</>;
} 