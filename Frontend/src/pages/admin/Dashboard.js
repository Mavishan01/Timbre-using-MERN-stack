import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Grid } from '@mui/material';
import AdminDashboard from '../AdminDashboard';
import { ThemeContext } from "../../../../Frontend/src/themecontext/ThemeContext";
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(null);
  const [ProductCount, setProductCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const fetchCustomerCount = async () => {
    setLoading(true); // Start loading before fetching data
    try {
      const response = await fetch('/api/customers/get/customerCount');
      const data = await response.json();
      setCustomerCount(data.count);
    } catch (error) {
      console.error('Error fetching customer count:', error);
      setCustomerCount(0); // Fallback to 0 if an error occurs
    } finally {
      setLoading(false); // Stop loading after the fetch is done
    }
  };

  const fetchProductCount = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products/get/productCount');
      const data = await response.json();
      setProductCount(data.count);
    } catch (error) {
      console.error('Error fetching product count:', error);
      setProductCount(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderCount = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/invoices/get/orderCount');
      const data = await response.json();
      setOrderCount(data.count);
    } catch (error) {
      console.error('Error fetching order count:', error);
      setOrderCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch customer count when the component mounts
    fetchCustomerCount();
    fetchProductCount();
    fetchOrderCount();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flex: 1, padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the Admin Dashboard. Here you can manage your site content and settings.
        </Typography>
  
        {/* Grid for row display */}
        <Grid container spacing={3} justifyContent="center" marginTop={4}>
          {/* Card for Total Customers */}
          <Grid item>
            <Card 
              sx={{ 
                width: 300, 
                backgroundColor: darkMode ? "#123456" : "#e0e0e0", 
                transition: 'transform 0.3s', 
                '&:hover': { transform: 'scale(1.05)' }, 
                boxShadow: 4,
                padding: 2,
              }}
            >
              <CardContent>
                {/* Icon related to Customers */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                  <PeopleIcon sx={{ fontSize: 50, color: darkMode ? "#ffcc00" : "#1976d2" }} />
                </Box>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                  Total Customers
                </Typography>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography 
                    variant="h3" 
                    component="div" 
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold', 
                      marginTop: 2,
                      color: darkMode ? "#ffcc00" : "#1976d2", 
                    }}
                  >
                    {customerCount !== null ? customerCount : 0}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
  
          {/* Card for Total Products */}
          <Grid item>
            <Card 
              sx={{ 
                width: 300, 
                backgroundColor: darkMode ? "#123456" : "#e0e0e0", 
                transition: 'transform 0.3s', 
                '&:hover': { transform: 'scale(1.05)' }, 
                boxShadow: 4,
                padding: 2,
              }}
            >
              <CardContent>
                {/* Icon related to Products */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                  <ShoppingCartIcon sx={{ fontSize: 50, color: darkMode ? "#ffcc00" : "#1976d2" }} />
                </Box>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                  Total Products
                </Typography>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography 
                    variant="h3" 
                    component="div" 
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold', 
                      marginTop: 2,
                      color: darkMode ? "#ffcc00" : "#1976d2", 
                    }}
                  >
                    {ProductCount !== null ? ProductCount : 0}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
  
          {/* Card for Total Orders */}
          <Grid item>
            <Card 
              sx={{ 
                width: 300, 
                backgroundColor: darkMode ? "#123456" : "#e0e0e0", 
                transition: 'transform 0.3s', 
                '&:hover': { transform: 'scale(1.05)' }, 
                boxShadow: 4,
                padding: 2,
              }}
            >
              <CardContent>
                {/* Icon related to Orders */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                  <AssignmentIcon sx={{ fontSize: 50, color: darkMode ? "#ffcc00" : "#1976d2" }} />
                </Box>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                  Total Orders
                </Typography>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Typography 
                    variant="h3" 
                    component="div" 
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold', 
                      marginTop: 2,
                      color: darkMode ? "#ffcc00" : "#1976d2", 
                    }}
                  >
                    {orderCount !== null ? orderCount : 0}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
  
};

export default Dashboard;
