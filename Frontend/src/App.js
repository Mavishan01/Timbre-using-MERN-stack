import React from 'react';
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
import { ThemeContextProvider } from './themecontext/ThemeContext';
import GetInTouch from './pages/GetInTouch';
import { AuthContextProvider, useAuth } from './auth/AuthContext'; // Import the AuthContext

const App = () => {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <CssBaseline />
        <Router>
          <ConditionalNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/products/:productType" element={<ProductListingPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/get-in-touch" element={<GetInTouch/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
          <ConditionalFooter />
        </Router>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};

const ConditionalNavbar = () => {
  const { userRole, isLoggedIn } = useAuth();

  // Show Navbar and Footer only if the user is logged in as a customer
  if (isLoggedIn && userRole === 'customer') {
    return (
      <>
        <Navbar />
      </>
    );
  }
  return null;
};

const ConditionalFooter = () => {
  const { userRole, isLoggedIn } = useAuth();

  // Show Navbar and Footer only if the user is logged in as a customer
  if (isLoggedIn && userRole === 'customer') {
    return (
      <>
        <Footer />
      </>
    );
  }
  return null;
};

export default App;
