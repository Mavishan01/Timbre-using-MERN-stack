import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, CssBaseline } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Import the admin pages
import Dashboard from './admin/Dashboard';
import ManageUsers from './admin/ManageUsers';
import ProductManagement from './admin/products/ProductManagement'; // Updated import
import ColorManagement from './admin/colors/ColorManagament';
import Orders from './admin/Orders';
import CategoryManagement from './admin/categories/CategoryManagement'; // Updated import
import BrandManagement from './admin/brands/BrandManagement'; // Updated import
import ModelManagement from './admin/models/ModelManagement'; // Updated import
import Enquiries from './admin/Enquiries';
import Settings from './admin/Settings';

const Sidebar = styled('div')(({ theme }) => ({
  width: 240,
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
}));

const AdminPage = () => {
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
          <ListItem component={Link} to="/admin/manage-colors" button>
            <ListItemText primary="Colors" />
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
          <ListItem component={Link} to="/admin/enquiries" button>
            <ListItemText primary="Enquiries" />
          </ListItem>
          <ListItem component={Link} to="/admin/settings" button>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Divider />
      </Sidebar>
      <Box
        component="main"
        sx={{ flexGrow: 1, padding: 3 }}
      >
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-products" element={<ProductManagement />} /> {/* Updated route */}
          <Route path="manage-colors" element={ColorManagement}/>
          <Route path="orders" element={<Orders />} />
          <Route path="categories" element={<CategoryManagement />} /> {/* Updated route */}
          <Route path="brands" element={<BrandManagement />} /> {/* Updated route */}
          <Route path="models" element={<ModelManagement />} /> {/* Updated route */}
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminPage;