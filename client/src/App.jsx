import {
  Route,
  Routes,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import HomeView from './views/HomeView.jsx';
import SearchView from './views/SearchView.jsx';
import NotFound from './views/notFound/404.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import CatalogView from './views/catalog/CatalogView.jsx';
import Details from './components/details/Details.jsx';
import Register from './views/auth/Register.jsx';
import Login from './views/auth/Login.jsx';
import CreateRecipe from './components/recipes/CreateRecipe.jsx';
import EditRecipe from './components/recipes/EditRecipe.jsx';
import DeleteRecipe from './components/recipes/DeleteRecipe.jsx';
import ProtectedRoutes from './util/ProtectedRoutes.jsx';
import AuthContext from './context/auth-context.js';
import { useContext } from 'react';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<MainLayout />}>
//       <Route index element={<HomeView />} />
//       <Route path='about' element={<AboutView />} />
//       <Route path='catalog' element={<CatalogView />} />
//       <Route path='catalog/:id' element={<Details />} />
//       <Route path='register' element={<Register />} />
//       <Route path='login' element={<Login />} />
//       <Route path='edit/:id' element={<EditRecipe />} />
//       <Route path='create' element={<CreateRecipe />} />
//       <Route path='delete/:id' element={<DeleteRecipe />} />

//       <Route path='*' element={<NotFound />} />
//     </Route>
//   )
// );

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomeView />} />
        <Route path='serach' element={<SearchView />} />
        <Route path='catalog' element={<CatalogView />} />
        <Route path='catalog/:id' element={<Details />} />
        {/* Rotected routes  only for logged in users */}
        <Route element={<ProtectedRoutes />}>
          <Route path='create' element={<CreateRecipe />} />
          <Route path='edit/:id' element={<EditRecipe />} />
          <Route path='delete/:id' element={<DeleteRecipe />} />
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
