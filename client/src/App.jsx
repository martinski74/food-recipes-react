import {
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import HomeView from './views/HomeView.jsx';
import AboutView from './views/AboutView.jsx';
import NotFound from './views/notFound/404.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import CatalogView from './views/catalog/CatalogView.jsx';
import Details from './components/details/Details.jsx';
import Register from './views/auth/Register.jsx';
import Login from './views/auth/Login.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomeView />} />
      <Route path='about' element={<AboutView />} />
      <Route path='catalog' element={<CatalogView />} />
      <Route path='catalog/:id' element={<Details />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
