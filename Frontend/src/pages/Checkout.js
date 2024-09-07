import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Divider } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state.selectedItems || [];
  const [customer, setCustomer] = useState('');
  const [amount,setAmount] = useState();
  const orderId = `ORDER-${Date.now()}`;
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    fetch(`api/customers/address?id=${decodedToken.id}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setCustomer(data.customer)
        console.log(data.customer)
      })
      .catch(error => console.error(error));
      setAmount(calculateTotal());
  }, [cartItems]);

  const createInvoice = async () => {
    try {
      const response = await fetch("api/invoices/createInvoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          customer_id: customer?._id,
          total: amount,
          items: cartItems.map(item => ({
            product_id: item.product_id,
            qty: item.quantity,
          })),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      toast.success('Order placed successfully! Invoice created.');
      navigate('/purchaseHistory', { state: { userId: customer?._id } });
    } catch (error) {
      toast.error("Error creating invoice:", error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await fetch("/api/payments/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchant_id: "1228112",
          order_id:orderId,
          amount: amount,
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
        items:customer?.first_name + customer?.last_name + " s' Order : "+orderId,
        amount: data.amount,
        currency: data.currency,
        hash: data.hash,
        first_name: customer?.first_name,
        last_name: customer?.last_name,
        email: customer?.email,
        phone: customer?.mobile,
        address: customer?.address,
        city: "Colombo",
        country: "Sri Lanka",
        delivery_address: customer?.address,
        delivery_city: "",
        delivery_country: "",
        custom_1: "",
        custom_2: "",
      };
  
      window.payhere.startPayment(payment);
      window.payhere.onCompleted = async (paymentData) => {
        await createInvoice();
      };
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
        Checkout
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 'semi-bold' }}  variant="h6" gutterBottom>
          Delivery Details
        </Typography>
        <Divider sx={{ my: 2 }} />
        {/* Add your delivery form or details here */}
        <Typography>{customer?.mobile}</Typography>
        <Typography>{customer?.email}</Typography>
        <Typography>{customer?.address}</Typography>
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'semi-bold' }} gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ my: 2 }} />
        {cartItems?.map((item) => (
          <Box key={item.product_id} sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3} md={2}>
                <img src={item.imageUrl} alt={item.name} style={{ width: 'auto', borderRadius: '4px', height: '150px' }} />
              </Grid>
              <Grid item xs={12} sm={9} md={10}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body1">Price: LKR.{item.price}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">Quantity: {item.quantity}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
        <Typography variant="h6" sx={{ textAlign: 'right' }}>
          Total: LKR.{calculateTotal()}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2, display: 'block', ml: 'auto' }} onClick={handlePayment}>
          Place Order
        </Button>
      </Paper>
    </Box>
  );
};

export default Checkout;
