import React from 'react';
import { Typography, Box } from '@mui/material';

const Orders = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Orders
      </Typography>
      <Typography variant="body1">
        Here you can view and manage customer orders.
      </Typography>
    </Box>
  );
};

export default Orders;