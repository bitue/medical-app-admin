import { Navigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, checkAuth } = useAuth();

  // Check authentication status
  const isAuth = checkAuth();

  if (!isAuth) {
    // Redirect to signin if not authenticated
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}; 