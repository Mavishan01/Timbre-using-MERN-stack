// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactForm from './pages/GetInTouch';
import Profile from './pages/Profile';
import ProductListingPage from './pages/ProductListingPage';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeContextProvider } from './themecontext/ThemeContext';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import AuthRoute from './components/AuthRoute'; // Import AuthRoute
import AdminRoute from './components/AdminRoute'; // Import AdminRoute

import Dashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ProductManagement from './pages/admin/products/ProductManagement';
import Orders from './pages/admin/Orders';
import CategoryManagement from './pages/admin/categories/CategoryManagement';
import BrandManagement from './pages/admin/brands/BrandManagement';
import ModelManagement from './pages/admin/models/ModelManagement';
import Settings from './pages/admin/Settings';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        {user?.type !== 'Admin' && (
          <Navbar />
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/products/:productType" element={<ProductListingPage />} />

          <Route
            path="/cart"
            element={<AuthRoute component={Cart} />}
          />
          <Route
            path="/wishlist"
            element={<AuthRoute component={Wishlist} />}
          />
          <Route
            path="/profile"
            element={<AuthRoute component={Profile} />}
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={<AdminRoute component={AdminDashboard} />}
          />

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-products" element={<ProductManagement />} /> {/* Updated route */}
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/categories" element={<CategoryManagement />} /> {/* Updated route */}
          <Route path="/admin/brands" element={<BrandManagement />} /> {/* Updated route */}
          <Route path="/admin/models" element={<ModelManagement />} /> {/* Updated route */}
          <Route path="/admin/settings" element={<Settings />} />

        </Routes>
        {/* <Footer /> */}
        {user?.type !== 'Admin' && (
          <Footer />
        )}
      </Router>
    </ThemeContextProvider>
  );
};

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
