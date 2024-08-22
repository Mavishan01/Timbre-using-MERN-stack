// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Token decoding error:", error);
        localStorage.removeItem('token'); // Remove invalid token
      }
    }else{
      console.log("No token")
    }
  }, []);

  const login = async (email, password, isAdmin) => {
    try {
      const response = await axios.post(`/api/auth/${isAdmin ? 'admin-login' : 'login'}`, { email, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      }
    } catch (error) {
      console.error("Authentication error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
