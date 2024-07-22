import { Outlet, Navigate } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';

const ProtectedRoutes = () => {
  const authCtx = useContext(AuthContext);
  const isAuth = authCtx.isLoggedIn;

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};
export default ProtectedRoutes;
