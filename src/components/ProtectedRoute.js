import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user || !user.role) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    // Logged in but not an admin
    return <Navigate to="/unauthorized" replace />;
  }

  return children; // Allow access
};

export default ProtectedRoute;
