import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Grid, Paper, IconButton, Checkbox } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { jwtDecode } from 'jwt-decode'

const Cart = () => {
  const navigate = useNavigate();

  const initialCartItems = [
    { id: 1, name: 'Acoustic Guitar', quantity: 1, price: 500, imageUrl: 'https://via.placeholder.com/100', selected: true },
    { id: 2, name: 'Electric Guitar', quantity: 2, price: 800, imageUrl: 'https://via.placeholder.com/100', selected: true },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    if (token!==null) {
      fetch(`api/cart?id=${decodedToken.id}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Success") {
            const items = data.products.map(product => {
              return {
                id: product._id,
                product_id: product.product_id._id,
                name: product.product_id.title,
                quantity: product.quantity,
                price: product.product_id.price,
                imageUrl: 'http://localhost:4000/products/' + product.product_id.img_card,
                selected: product.status
              };
            });
            console.log(items)
            setCartItems(items)
          } else {
            alert(data.message)
          }
        })
        .catch(error => console.error('Error:', error));
    }
    else {

      console.error("No token found, redirecting to login.");
      navigate("/");
    }
  }, [navigate]);

  const handleQuantityChange = (id, increment, selected, qty) => {
    if (selected) {
      fetch('api/cart/updateQty',
        {
          method: 'PUT',
          headers: { 'Content-Type': "application/json" },
          body: JSON.stringify({
            id: id,
            quantity: qty + increment
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Success") {
            setCartItems(prevItems =>
              prevItems.map(item =>
                item.id === id
                  ? { ...item, quantity: Math.max(1, item.quantity + increment) }
                  : item
              )
            );
          }
        })
        .catch(error => console.error('Error:', error));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + increment) }
            : item
        )
      );
    }
  };

  const handleDelete = (id) => {
    fetch(`api/cart/deleteProduct/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Success") {
          setCartItems(prevItems => {
            return prevItems.filter(item => item.id !== id)
          }
          );
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleSelectChange = (id, qty, status) => {
    fetch(`api/cart/updateProduct`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, quantity: qty, status: !status })
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Success') {
          setCartItems(prevItems =>
            prevItems.map(item =>
              item.id === id
                ? { ...item, selected: !item.selected }
                : item
            )
          );
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected)
    navigate('/checkout', { state: { selectedItems } })
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
          cartItems?.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={item.selected}
                    onChange={() => handleSelectChange(item.id, item.quantity, item.selected)}
                    color="primary"
                    sx={{ mr: 2 }}
                  />
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '250px', borderRadius: '4px' }} />
                </Grid>
                <Grid item xs={12} sm={9} md={10}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body1">Price: ${item.price}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} container spacing={1} alignItems="center" justifyContent="flex-end">
                      <Grid item>
                        <IconButton
                          onClick={() => handleQuantityChange(item.id, -1, item.selected, item.quantity)}
                          disabled={item.quantity <= 1}
                          sx={{
                            border: '1px solid',
                            borderRadius: '50%',
                            padding: '5px',
                            width: '30px',
                            height: '30px'
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{item.quantity}</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => handleQuantityChange(item.id, 1, item.selected, item.quantity)}
                          sx={{
                            border: '1px solid',
                            borderRadius: '50%',
                            padding: '5px',
                            width: '30px',
                            height: '30px'
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
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

export default Cart;
