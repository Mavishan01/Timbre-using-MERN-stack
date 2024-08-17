// components/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AdminRoute = ({ component: Component }) => {
  const { user } = useContext(AuthContext);

  return user?.type === 'Admin' ? <Component /> : <Navigate to="/login" replace />;
};

export default AdminRoute;