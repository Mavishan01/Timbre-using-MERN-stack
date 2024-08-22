import React from 'react';
import { Typography, Box } from '@mui/material';
import AdminDashboard from '../AdminDashboard';

const Orders = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Orders
        </Typography>
        <Typography variant="body1">
          Here you can view and manage customer orders.
        </Typography>
      </Box>
    </Box>
  );
};

export default Orders;