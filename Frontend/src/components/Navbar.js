// Navbar.js
import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import { ThemeContext } from "../themecontext/ThemeContext";
//import PopoverMenu from "./PopoverMenu";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import LoginPopup from "./LoginPopup";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
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
}));

const Navbar = () => {
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  // const [anchorEl, setAnchorEl] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  // const handlePopoverOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  // const open = Boolean(anchorEl);
  const handleCartClick = () => {
    if(!token)
    {
      alert("Please login or sign up first!")
      return;
    }
    else
    {
      navigate("/cart")
    }
  }

  const handleFavoriteClick = () => {
    if(!token)
    {
      alert("Please login or sign up first!")
      return;
    }
    else
    {
      navigate("/wishlist")
    }
  }

  const handleProfileClick = () => {
    if(!token)
    {
      alert("Please login or sign up first!")
      return;
    }
    else
    {
      navigate("/profile")
    }
  }
  

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onMouseEnter={handlePopoverOpen}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          TIMBRE
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button 
          color="inherit" 
          sx={{ ml: 2, px: 2, py: 1 }} 
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <ShoppingCartIcon onClick={handleCartClick} />
          </Badge>
        </IconButton>
        <IconButton component={Link} to="/wishlist" color="inherit"> {/* Link to WishlistPage */}
          <FavoriteIcon onClick={handleFavoriteClick} />
        </IconButton>
        <IconButton component={Link} to="/profile" color="inherit">
          <AccountCircleIcon onClick={handleProfileClick} />
        </IconButton>
        <Switch checked={darkMode} onChange={toggleDarkMode} />

        {/* <PopoverMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handlePopoverClose}
        /> */}
      </Toolbar>
      <LoginPopup open={loginOpen} handleClose={handleLoginClose} />
    </AppBar>
  );
};

export default Navbar;
