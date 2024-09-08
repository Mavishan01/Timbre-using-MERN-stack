import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const PurchaseHistory = () => {
  // const location = useLocation();
  // const userId = location.state?.userId;

  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([])

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  useEffect(() => {
    if (token!==null) {
        fetch(`/api/invoice-items/purchase-history/${decodedToken.id}`,{
        method: 'GET'
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setOrders(data.invoices);
          setOrderItems(data.items);
        })
        .catch((error) => {
          console.error("Error fetching purchase history:", error);
        });
      console.log("User ID:", decodedToken.id);
    }
  }, [decodedToken.id]);


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Purchasing History
      </Typography>
      <Divider sx={{ marginBottom: 4 }} />

      {orders.map((order) => (
        <Card sx={{ marginBottom: 4 }} key={order._id}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Order ID: {order.orderId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {order.createdAt}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Grand Total: Rs. {order.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Delivery Status: {order.delivery_status_id.status}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            {orderItems.map((item, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} sm={2}>
                  <CardMedia
                    component="img"
                    sx={{height:'200px',width:'200px',borderRadius:5,my:1}}
                    image={`http://localhost:4000/products/${item.product_id?.img_card}`}
                    alt={item.product_id?.title}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {item.product_id?.title}
                    </Typography>
                    <Typography variant="body1">
                      Rs. {item.product_id?.price}
                    </Typography>
                    <Typography variant="body2">
                      Quantity: {item?.qty}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 1,
                      }}
                    >
                      <Typography variant="body1" sx={{ marginRight: 1 }}>
                        Total: Rs. {item.product_id?.price}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PurchaseHistory;
