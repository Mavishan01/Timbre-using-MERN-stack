// Checkout.js
import React from 'react';
import { Box, Typography, Paper, Grid, Button, Divider } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || []; // Get cartItems from location.state

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    navigate('/'); // Redirect to home after placing order
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Delivery Details
        </Typography>
        <Divider sx={{ my: 2 }} />
        {/* Add your delivery form or details here */}

        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ my: 2 }} />
        {cartItems.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3} md={2}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: '4px' }} />
              </Grid>
              <Grid item xs={12} sm={9} md={10}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body1">Price: ${item.price}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">Quantity: {item.quantity}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
        <Typography variant="h6" sx={{ textAlign: 'right' }}>
          Total: ${calculateTotal()}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Paper>
    </Box>
  );
};

export default Checkout;
