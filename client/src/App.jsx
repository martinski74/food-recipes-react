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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomeView />} />
      <Route path='about' element={<AboutView />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
