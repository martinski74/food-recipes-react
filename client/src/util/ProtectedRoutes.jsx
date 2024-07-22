import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};
export default ProtectedRoutes;
