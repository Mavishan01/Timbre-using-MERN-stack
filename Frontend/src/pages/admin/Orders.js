import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import AdminDashboard from '../AdminDashboard';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // Handle row click and navigate to order details
  const handleRowClick = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  useEffect(() => {
    fetch('/api/invoices/')
      .then((response) => response.json())
      .then((data) => setOrders(data.invoices))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Orders
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: '85vh', overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date Time</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  hover
                  onClick={() => handleRowClick(order._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.customer_id.email}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</TableCell>
                  <TableCell>LKR {order.total}.00</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={order.delivery_status_id.status === 'Delivered' ? 'success' : 'warning'}
                    >
                      {order.delivery_status_id.status}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Orders;
