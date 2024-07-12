import { Outlet } from 'react-router';
import Navigation from '../components/navigation/Navigation';
import Footer from '../components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import AuthContext from '../context/auth-context';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />

      <Footer />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
