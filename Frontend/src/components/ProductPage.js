import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Grid, Card, CardMedia } from '@mui/material';
import { AddShoppingCart, FavoriteBorder, Add, Remove } from '@mui/icons-material';
import InstrumentImage from '../components/pexels-pixabay-39348.jpg'; // Use the existing image or replace with a new one

const ProductPage = () => {

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: '1200px', marginLeft: 0 }}> {/* Align content to the left */}
      <Grid container spacing={4}>
        {/* Product Image Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={InstrumentImage} // Replace with the product's image source
              alt="Instrument Image"
              sx={{ width: '100%', height: 'auto', objectFit: 'contain' }} // Ensure the image scales properly
            />
          </Card>
        </Grid>

        {/* Product Details Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            Generic Instrument Name
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Brand: Generic Brand
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: $100
          </Typography>
          <Typography variant="body1" gutterBottom>
            Availability: In Stock
          </Typography>

          <Grid container alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Grid item>
              <Typography variant="body1">Quantity:</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleDecrement} aria-label="decrease quantity" color="primary">
                <Remove />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="body1">{quantity}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleIncrement} aria-label="increase quantity" color="primary">
                <Add />
              </IconButton>
            </Grid>
          </Grid>


          <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
              variant="contained" 
              sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'white', color: 'black' } }} 
              startIcon={<AddShoppingCart />}
            >
              Add to Cart
            </Button>
            <IconButton color="secondary" aria-label="add to wishlist">
              <FavoriteBorder />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;