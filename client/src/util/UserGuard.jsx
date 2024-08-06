import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';

const UserGuard = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  if (isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default UserGuard;
