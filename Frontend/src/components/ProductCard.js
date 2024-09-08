import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button } from "@mui/material";
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import toast from "react-hot-toast";


export default function ProductCard({ item }) {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCardClick = () => {
    navigate(`/productpage/${item._id}`, { state: { item } });
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
        toast.error('Error:', error.message);
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
        toast.error('Error:', error.message);
      })
  }
  return (
    <Card sx={{ maxWidth: 300, my:2, maxHeight: 450, boxShadow: 'none' }}  style={{ cursor: 'pointer' }}> {/* Add onClick handler */}

      <CardMedia onClick={handleCardClick}
        component="img"
        height="194"
        image={`http://localhost:4000/products/${item?.img_card}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: 15 }}
        >
          {item?.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              my: 2,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            LKR {item?.price}.00
          </Typography>
          <IconButton aria-label="add to favorites" sx={{ marginLeft: 1 }}>
            <FavoriteIcon onClick={handleAddToWishlist} />
          </IconButton>
        </Box>
        
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 1.5,
          gap: 1,
        }}
      >
        <Button onClick={handleAddToCart} variant="outlined" sx={{
          width: "100%", fontSize: '10px', borderColor: 'red', color: 'red', '&:hover': {
            backgroundColor: "#fff2f2", borderColor: 'red'
          },
        }}>
          Add to Cart
        </Button>
        <Button onClick={handleCardClick} variant="outlined" sx={{ width: "100%", fontSize: '10px', color: 'green', borderColor: 'green', '&:hover': { backgroundColor: '#f2fff3', borderColor: 'green' } }}>
          Buy Now
        </Button>
      </Box>
    </Card>
  );
}
