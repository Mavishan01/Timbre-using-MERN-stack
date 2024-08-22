// components/AuthRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AuthRoute = ({ component: Component }) => {
  const { user } = useContext(AuthContext);

  return user ? <Component /> : <Navigate to="/" replace />;
};

export default AuthRoute;