import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, CssBaseline, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = styled('div')(({ theme }) => ({
  width: 240,
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
}));

const AdminPage = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
    window.location.reload(); // Refresh the page after navigating to the home page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar>
        <Typography variant="h6" component="div" gutterBottom>
          Admin Menu
        </Typography>
        <List>
          <ListItem component={Link} to="/admin/dashboard" button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/admin/manage-users" button>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem component={Link} to="/admin/manage-products" button>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem component={Link} to="/admin/orders" button>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem component={Link} to="/admin/categories" button>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem component={Link} to="/admin/brands" button>
            <ListItemText primary="Brands" />
          </ListItem>
          <ListItem component={Link} to="/admin/models" button>
            <ListItemText primary="Models" />
          </ListItem>
          <ListItem component={Link} to="/admin/settings" button>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          startIcon={<LogoutIcon />}
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Divider />
      </Sidebar>
      <Box
        component="main"
        sx={{ flexGrow: 1, padding: 3 }}
      >
        {/* Content of the admin page will be displayed here */}
      </Box>
    </Box>
  );
};

export default AdminPage;