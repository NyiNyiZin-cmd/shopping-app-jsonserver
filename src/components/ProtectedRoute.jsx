import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - Current user:', user);
  console.log('ProtectedRoute - Required role:', requiredRole);
  console.log('ProtectedRoute - Current path:', location.pathname);

  if (loading) {
    console.log('ProtectedRoute - Loading user data...');
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log(`ProtectedRoute - User role (${user.role}) doesn't match required role (${requiredRole}), redirecting to home`);
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute - Access granted');
  return children;
};
