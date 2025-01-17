import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Show a loading indicator while authentication status is being determined
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated, render the child components
  if (isAuthenticated) {
    return <Outlet />;
  }

  // Otherwise, redirect to the home page or login page
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
