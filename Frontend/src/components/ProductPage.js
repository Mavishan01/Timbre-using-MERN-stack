import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Grid, Card, CardMedia } from '@mui/material';
import { AddShoppingCart, FavoriteBorder, Add, Remove } from '@mui/icons-material';
import InstrumentImage from '../components/pexels-pixabay-39348.jpg'; // Use the existing image or replace with a new one
import { useLocation } from "react-router-dom";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const ProductPage = () => {
  const location = useLocation();
  const item = location.state?.item || {}
  const [quantity, setQuantity] = useState(1);
  const [merchantId, setMerchantId] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [order_id, setOrderId] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [hash, setHash] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);
    };

    window.payhere.onDismissed = function onDismissed() {
      toast.error("Payment dismissed")
    };

    window.payhere.onError = function onError(error) {
      console.log("Error:" + error);
    };
  }, []);

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/payments/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchant_id: "1228112",
          order_id: "ORDER123",
          amount: 100,
          currency: "LKR",
          merchantSecret:
            "MjkyMzIzMjk4MzUyNTUxMDMzNTU0NTQzMjQ4NTMzOTk5NzE5NDM=",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const payment = {
        sandbox: true,
        merchant_id: data.merchant_id,
        return_url: "http://localhost/",
        cancel_url: "http://localhost/",
        notify_url: "http://localhost/",
        order_id: data.order_id,
        items: "Door bell wireless",
        amount: data.amount,
        currency: data.currency,
        hash: data.hash,
        first_name: "Saman",
        last_name: "Perera",
        email: "samanp@gmail.com",
        phone: "0771234567",
        address: "No.1, Galle Road",
        city: "Colombo",
        country: "Sri Lanka",
        delivery_address: "No. 46, Galle road, Kalutara South",
        delivery_city: "Kalutara",
        delivery_country: "Sri Lanka",
        custom_1: "",
        custom_2: "",
      };

      window.payhere.startPayment(payment);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error("Please login or sign up first!");
      return;
    }
    console.log(item)
    const selectedItems = [{
      id: item._id,
      product_id: item._id,
      name: item.title,
      quantity: quantity,
      price: item.price,
      imageUrl: 'http://localhost:4000/products/' + item.img_card,
    }]
    navigate('/checkout', { state: { selectedItems } })
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error("Please login or sign up first!");
      return;
    }
    const decodedToken = jwtDecode(token);
    fetch('/api/cart/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: item._id,
        customer_id: decodedToken.id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message)
      })
      .catch((error) => {
        console.error('Error:', error.message);
      })
  }

  const handleAddToWishlist = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error("Please login or sign up first!");
      return;
    }
    const decodedToken = jwtDecode(token);
    fetch('/api/wishlist/addToWishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: item._id,
        customer_id: decodedToken.id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message)
      })
      .catch((error) => {
        console.error('Error:', error.message);
      })
  }

  return (
    <Box sx={{ paddingTop:3 }}>
    <Box sx={{ padding: 3, maxWidth: '1200px', marginLeft: 0 }}> {/* Align content to the left */}
      <Grid container spacing={4}>
        {/* Product Image Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={`http://localhost:4000/products/${item?.img_card}`}
              alt="Instrument Image"
              sx={{ width: '100%', height: '400px', objectFit: 'cover' }} // Ensure the image scales properly
            />
          </Card>
        </Grid>

        {/* Product Details Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Brand: {item.brand_id?.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: LKR {item.price}.00
          </Typography>
          <Typography variant="body1" gutterBottom>
            Availability: {item.quantity} In Stock
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
              sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'green', color: 'white' } }}
              startIcon={<PaymentsOutlinedIcon />}
              onClick={handleCheckout}
            >
              Buy Now
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'black', color: 'white' } }}
              startIcon={<AddShoppingCart />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <IconButton onClick={handleAddToWishlist} color="secondary" aria-label="add to wishlist">
              <FavoriteBorder />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};

export default ProductPage;