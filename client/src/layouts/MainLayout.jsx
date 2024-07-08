import { Outlet } from 'react-router';
import Navigation from '../components/navigation/Navigation';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
