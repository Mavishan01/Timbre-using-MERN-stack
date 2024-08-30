// Navbar.js
import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../themecontext/ThemeContext";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginPopup from "./LoginPopup";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px", // Makes the search bar pill-shaped
  backgroundColor: "transparent", // Remove fill
  border: "1px solid black", // Black border for light mode
  "&:hover": {
    borderColor: theme.palette.grey[500], // Darker border on hover
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme, darkMode }) => ({
  color: darkMode ? "white" : "black", // Set text color based on theme
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  "&::placeholder": {
    color: darkMode ? "white" : "black", // Dynamic placeholder color
    opacity: 1, // Ensures the placeholder text color is not faded
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [loginOpen, setLoginOpen] = useState(false);

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
    <AppBar position="fixed" sx={{ backgroundColor: darkMode ? "black" : "white", boxShadow: "none" }}>
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
        <Search sx={{ border: darkMode ? "1px solid white" : "1px solid black" }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: darkMode ? "white" : "black" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            darkMode={darkMode} // Pass the darkMode state to StyledInputBase
          />
        </Search>
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
          Login
        </Button>
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
          onClick={handleProfileClick}
          sx={{ color: darkMode ? "white" : "black" }} // Dynamic color for dark mode
        >
          <AccountCircleIcon />
        </IconButton>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </Toolbar>
      <LoginPopup open={loginOpen} handleClose={handleLoginClose} />
    </AppBar>
  );
};

export default Navbar;