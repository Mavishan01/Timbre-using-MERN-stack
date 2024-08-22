// components/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AdminRoute = ({ component: Component }) => {
  const { user } = useContext(AuthContext);
  console.log("AdminRoute - User:", user); // Add this line to debug

  return user?.type === 'Admin' ? <Component /> : <Navigate to="/" replace />;
};


export default AdminRoute;

