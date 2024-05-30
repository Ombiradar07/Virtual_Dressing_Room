import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Order from './pages/Order';
import Cart from './pages/Cart';
import AdminDashboard from './pages/admin/AdminDashboard';
import NoPage from './pages/NoPage';
import MyState from './context/myState';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Productinfo from './pages/Productinfo';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import AddProduct from './pages/admin/pages/AddProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore';
import NetworkError from './components/NetworkError'; // Import the NetworkError component

export const ProtectedRoutesForUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'));
  if (admin && admin.user.email === import.meta.env.VITE_ADMIN_EMAIL1) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <NetworkError />;
  }

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={
            <ProtectedRoutesForUser>
              <Order />
            </ProtectedRoutesForUser>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/explore" element={
            <ProtectedRoutesForUser>
              <Explore />
            </ProtectedRoutesForUser>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin>
              <AdminDashboard />
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addproduct" element={
            <ProtectedRoutesForAdmin>
              <AddProduct />
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/updateproduct" element={
            <ProtectedRoutesForAdmin>
              <UpdateProduct />
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/productinfo/:id" element={<Productinfo />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;
