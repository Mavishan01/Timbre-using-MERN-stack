// WishlistPage.js
import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Grid, Paper, IconButton } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon, Delete as DeleteIcon } from '@mui/icons-material';

const WishlistPage = () => {
  const initialWishlistItems = [
    { id: 1, name: 'Classical Guitar', price: 600, imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Bass Guitar', price: 900, imageUrl: 'https://via.placeholder.com/100' },
  ];

  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const handleAddToCart = (item) => {
    // Logic to add the item to the cart
    alert(`${item.name} added to cart`);
  };

  const handleDelete = (id) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Wishlist
      </Typography>
      <Paper sx={{ p: 2 }}>
        {wishlistItems.length === 0 ? (
          <Typography variant="h6" align="center">
            Your wishlist is empty
          </Typography>
        ) : (
          wishlistItems.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4} sm={3} md={2}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '60%', borderRadius: '4px' }} />
                </Grid>
                <Grid item xs={8} sm={5} md={6}>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body1">Price: ${item.price}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} container justifyContent="flex-end" spacing={1}>
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton color="error" onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default WishlistPage;
