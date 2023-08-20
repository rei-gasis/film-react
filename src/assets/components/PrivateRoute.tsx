import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
