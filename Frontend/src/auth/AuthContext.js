// src/auth/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('customer'); // Possible values: 'customer', 'admin'
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Adjust based on your logic

  const loginAsCustomer = () => {
    setUserRole('customer');
    setIsLoggedIn(true);
  };

  const loginAsAdmin = () => {
    setUserRole('admin');
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, isLoggedIn, loginAsCustomer, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
