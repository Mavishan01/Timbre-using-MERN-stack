// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactForm from './pages/GetInTouch';
import ProductListingPage from './pages/ProductListingPage';
import { ThemeContextProvider } from './themecontext/ThemeContext';

const App = () => {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/products/:productType" element={<ProductListingPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
