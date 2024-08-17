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
<<<<<<< Updated upstream
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
=======
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist'; 
import AdminDashboard from './pages/AdminDashboard'; 
import { ThemeContextProvider } from './themecontext/ThemeContext';
import { AuthProvider } from './contexts/AuthContext'; 
import AuthRoute from './components/AuthRoute'; // Import AuthRoute
import AdminRoute from './components/AdminRoute'; // Import AdminRoute

const App = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <Navbar />
>>>>>>> Stashed changes
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/products/:productType" element={<ProductListingPage />} />
<<<<<<< Updated upstream
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/get-in-touch" element={<GetInTouch/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
          <ConditionalFooter />
        </Router>
      </ThemeContextProvider>
    </AuthContextProvider>
=======
            
            {/* Protected Routes */}
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
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeContextProvider>
>>>>>>> Stashed changes
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
