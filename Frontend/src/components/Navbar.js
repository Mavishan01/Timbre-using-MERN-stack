import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import { ThemeContext } from "../themecontext/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginPopup from "./LoginPopup";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HistoryIcon from '@mui/icons-material/History';
import toast from 'react-hot-toast';
import { Toaster } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [products, setproducts] = useState([]);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) { // Adjust the scroll threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/products/', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setproducts(data)
      })
      .catch(error => console.error(error));
  }, []);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleCartClick = () => {
    if (!token) {
      alert("Please login or sign up first!");
      return;
    } else {
      navigate("/cart");
    }
  };

  const handleHistoryClick = () => {
    if (!token) {
      alert("Please login or sign up first!");
      return;
    } else {
      navigate("/purchaseHistory",{ state: { userId: "66d7e361a93ceecfe5a221a7" } });
    }
  };

  const handleFavoriteClick = () => {
    if (!token) {
      alert("Please login or sign up first!");
      return;
    } else {
      navigate("/wishlist");
    }
  };

  const handleProfileClick = () => {
    if (!token) {
      alert("Please login or sign up first!");
      return;
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: darkMode ? "black" : "white",
          boxShadow: isScrolled ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "none", // Add shadow when scrolled
          transition: "box-shadow 0.3s ease-in-out", // Smooth transition
        }}
      >
        <Toolbar sx={{ height: "100px" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontFamily: "Pacifico",
              flexGrow: 1,
              textDecoration: "none",
              color: darkMode ? "white" : "black", // Dynamic color for dark mode
              fontSize: "30px",
            }}
          >
            Timbre
          </Typography>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={products}
            autoHighlight
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`http://localhost:4000/products/${option.img_card}`}
                    src={`http://localhost:4000/products/${option.img_card}`}
                    alt=""
                  />
                  {option.title}
                  
                </Box>
                
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Products"
                slotProps={{
                  htmlInput: {
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  },
                }}
              />
            )}
          />
          <Button
            color="inherit"
            sx={{
              ml: 2,
              px: 2,
              py: 1,
              color: darkMode ? "white" : "black", // Dynamic color for dark mode
            }}
            onClick={handleLoginClick}
          >
            {token===null ? 'Login' : 'Login'}
            
          </Button>
          <IconButton
            color="inherit"
            onClick={() => { navigate('/products') }}
            
            sx={{ color: darkMode ? "white" : "black" }} // Dynamic color for dark mode
          >
            <Badge color="error">
              <ShoppingBagIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleCartClick}
            sx={{ color: darkMode ? "white" : "black" }} // Dynamic color for dark mode
          >
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            color="inherit"
            onClick={handleFavoriteClick}
            sx={{ color: darkMode ? "white" : "black" }} // Dynamic color for dark mode
          >
            
            <FavoriteIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleHistoryClick}
            
            sx={{ color: darkMode ? "white" : "black" }} // Dynamic color for dark mode
          >
            <Badge color="error">
              <HistoryIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleProfileClick}
            sx={{ color: darkMode ? "white" : "black" }} // Dynamic color for dark mode
          >
            <AccountCircleIcon />
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Toolbar>
        <LoginPopup open={loginOpen} handleClose={handleLoginClose} />

      </AppBar>
    </>
  );
};

export default Navbar;