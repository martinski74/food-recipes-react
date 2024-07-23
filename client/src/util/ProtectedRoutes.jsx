import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return !isLoggedIn ? (
    <Navigate to='/login' state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
export default ProtectedRoutes;
