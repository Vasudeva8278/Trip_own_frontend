import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Use Navigate instead of Redirect
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
