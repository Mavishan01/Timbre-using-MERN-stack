// CartPage.js
import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Grid, Paper, IconButton, Checkbox } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';

const CartPage = () => {
  const initialCartItems = [
    { id: 1, name: 'Acoustic Guitar', quantity: 1, price: 500, imageUrl: 'https://via.placeholder.com/100', selected: true },
    { id: 2, name: 'Electric Guitar', quantity: 2, price: 800, imageUrl: 'https://via.placeholder.com/100', selected: true },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, increment) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + increment) }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleSelectChange = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Paper sx={{ p: 2 }}>
        {cartItems.length === 0 ? (
          <Typography variant="h6" align="center">
            Your cart is empty
          </Typography>
        ) : (
          cartItems.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={item.selected}
                    onChange={() => handleSelectChange(item.id)}
                    color="primary"
                    sx={{ mr: 2 }}
                  />
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: '4px' }} />
                </Grid>
                <Grid item xs={12} sm={9} md={10}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body1">Price: ${item.price}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} container spacing={1} alignItems="center">
                      <Grid item>
                        <IconButton onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>
                          <RemoveIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{item.quantity}</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                          <AddIcon />
                        </IconButton>
                      </Grid>
                      <Grid item sx={{ ml: 'auto' }}>
                        <IconButton color="error" onClick={() => handleDelete(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))
        )}
        {cartItems.length > 0 && (
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6">Total: ${calculateTotal()}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CartPage;
