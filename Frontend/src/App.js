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
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import PurchaseHistory from './pages/PurchaseHistory';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeContextProvider } from './themecontext/ThemeContext';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import AuthRoute from './components/AuthRoute';
import AdminRoute from './components/AdminRoute';
import ProductPage from './components/ProductPage';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ProductManagement from './pages/admin/products/ProductManagement';
import ColorManagement from './pages/admin/colors/ColorManagament';
import Orders from './pages/admin/Orders';
import CategoryManagement from './pages/admin/categories/CategoryManagement';
import BrandManagement from './pages/admin/brands/BrandManagement';
import ModelManagement from './pages/admin/models/ModelManagement';
import Settings from './pages/admin/Settings';
import { Box } from '@mui/material';
import OrderDetails from './pages/admin/orderDetails';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          {user?.type !== 'Admin' && <Navbar />}

          <Box
            component="main"
            sx={{
              flex: 1,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/productpage/:title" element={<ProductPage />} />

              {/* Authenticated Routes */}
              <Route path="/cart" element={<AuthRoute component={Cart} />} />
              <Route path="/checkout" element={<AuthRoute component={Checkout} />} />
              <Route path="/wishlist" element={<AuthRoute component={Wishlist} />} />
              <Route path="/purchaseHistory" element={<AuthRoute component={PurchaseHistory} />} />
              <Route path="/profile" element={<AuthRoute component={Profile} />} />

              {/* Admin Dashboard */}
              <Route path="/admin/dashboard" element={<AdminRoute component={AdminDashboard} />} />
              <Route path="/admin/landing" element={<Dashboard />} />
              <Route path="/admin/manage-users" element={<ManageUsers />} />
              <Route path="/admin/manage-products" element={<ProductManagement />} />
              <Route path="admin/manage-colors" element={<ColorManagement/>}/>
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/orders/:id" element={<OrderDetails />} />
              <Route path="/admin/categories" element={<CategoryManagement />} />
              <Route path="/admin/brands" element={<BrandManagement />} />
              <Route path="/admin/models" element={<ModelManagement />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Routes>
          </Box>

          {user?.type !== 'Admin' && <Footer />}
        </Box>
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