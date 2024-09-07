import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import AdminDashboard from '../AdminDashboard';

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(null);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await fetch('/api/customers/get/customerCount');
        const data = await response.json();
        setCustomerCount(data.count);
      } catch (error) {
        console.error('Error fetching customer count:', error);
      }
    };

    fetchCustomerCount();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flex: 1, padding: 3 }}> {/* Ensure the content takes available space */}
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the Admin Dashboard. Here you can manage your site content and settings.
        </Typography>

        {/* Card to display customer count */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Card sx={{ width: 300, backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                Total Customers
              </Typography>
              <Typography variant="h3" component="div" sx={{ textAlign: 'center', fontWeight: 'bold', marginTop: 2 }}>
                {customerCount !== null ? customerCount : 0}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
