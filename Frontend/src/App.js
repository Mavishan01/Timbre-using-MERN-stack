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
