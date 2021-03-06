import { Routes, Route } from 'react-router-dom';

import CartContext from './components/context/CartContext';
import UserContext from './components/context/AuthContext';

import { ProtectedRoutes } from './components/ProtectedRoutes';
import { PrivateRoutes } from './components/PrivateRoutes';
import { Register } from './components/Register';
import { NavBar } from './components/NavBar';
import { ItemListContainer } from './components/ItemListContainer';
import { Footer } from './components/Footer';
import { ItemDetailContainer } from './components/ItemDetailContainer';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { ListOrders } from './components/ListOrders';
import { useCurrentPage } from './components/hooks/useCurrentPage';

function App() {
  const location = useCurrentPage();

  return (
    <UserContext>
      <CartContext>
        { (location !== '/login' && location !== '/signup') && <NavBar /> }
        <Routes>
          <Route path='/' element={
            <ProtectedRoutes>
              <ItemListContainer />
            </ProtectedRoutes>
          } />
          <Route path='/login' element={
            <PrivateRoutes>
              <Login />
            </PrivateRoutes>
          } />
          <Route path='/signup' element={
            <PrivateRoutes>
              <Register />
            </PrivateRoutes>
          } />
          <Route path='/item/:id' element={
            <ProtectedRoutes>
              <ItemDetailContainer />
            </ProtectedRoutes>
          } />
          <Route path='/category/:categoryProduct' element={
            <ProtectedRoutes>
              <ItemListContainer />
            </ProtectedRoutes>
          } />
          <Route path='/cart' element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          } />
          <Route path='/orders' element={
            <ProtectedRoutes>
              <ListOrders />
            </ProtectedRoutes>
          } />
        </Routes>
        { (location !== '/login' && location !== '/signup') && <Footer /> }
      </CartContext>
    </UserContext>
  );
}

export default App;