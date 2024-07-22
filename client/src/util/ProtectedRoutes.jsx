import { Outlet, Navigate } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';

const ProtectedRoutes = ({ children, redirectPath = '/login' }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoutes;
