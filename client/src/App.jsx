import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';

import HomeView from './views/HomeView.jsx';
import SearchView from './views/SearchView.jsx';
import NotFound from './views/notFound/404.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import CatalogView from './views/catalog/CatalogView.jsx';
import Details from './components/details/Details.jsx';
import UserDetails from './views/UserDetails.jsx';
import Register from './views/auth/Register.jsx';
import Login from './views/auth/Login.jsx';
import CreateRecipe from './components/recipes/CreateRecipe.jsx';
import EditRecipe from './components/recipes/EditRecipe.jsx';
import DeleteRecipe from './components/recipes/DeleteRecipe.jsx';
import ProtectedRoutes from './util/ProtectedRoutes.jsx';
import UserGuard from './util/UserGuard.jsx';
import AuthContext from './context/auth-context.js';

const App = () => {
  const auth = useContext(AuthContext);
  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomeView />} />
          <Route path='serach' element={<SearchView />} />
          <Route path='catalog' element={<CatalogView />} />
          <Route path='catalog/:id' element={<Details />} />
          {/* Protected routes  only for logged in users */}
          <Route element={<ProtectedRoutes />}>
            <Route path='create' element={<CreateRecipe />} />
            <Route path='edit/:id' element={<EditRecipe />} />
            <Route path='delete/:id' element={<DeleteRecipe />} />
            <Route path='user/:id' element={<UserDetails />} />
          </Route>
          {/* User routes, only for logged in users. Prevent routing to Login and Register pages when is logged in */}
          <Route element={<UserGuard />}>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
