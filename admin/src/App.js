import Topbar from './components/topbar/Topbar';
import './App.css';

import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/login';
import { useSelector } from 'react-redux';

function App() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={userInfo?.isAdmin ? <Home /> : <Navigate to="/login" />}/>
        <Route path="/users" element={userInfo?.isAdmin ? <UserList /> : <Navigate to="/login" />}/>
        <Route path="/user/:id" element={userInfo?.isAdmin ? <User /> : <Navigate to="/login" />}/>
        <Route path="/newUser" element={userInfo?.isAdmin ? <NewUser /> : <Navigate to="/login" />} />
        <Route path="/products" element={userInfo?.isAdmin ? <ProductList /> : <Navigate to="/login" />}/>
        <Route path="/product/:id" element={userInfo?.isAdmin ? <Product /> : <Navigate to="/login" />}/>
        <Route path="/newproduct" element={userInfo?.isAdmin ? <NewProduct /> : <Navigate to="/login" />} />
        <Route path="/login" element={!userInfo?.isAdmin ? <Login /> : <Navigate to="/" />}/>
      </Routes>
    </Router>
  );
}

export default App;
