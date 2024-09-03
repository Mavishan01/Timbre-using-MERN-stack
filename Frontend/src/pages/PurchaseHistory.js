import React from 'react';
import {  Grid, Typography, Box, Divider, Card, CardContent, CardMedia, Rating } from '@mui/material';
import Invoice from '../components/Invoice';

const PurchaseHistory = () => {
    const orders = [
        {
            id: '68a463e0d2a1e',
            date: '2024-07-27 08:35:34',
            grandTotal: 5500.00,
            deliveryStatus: 'Pending',
            items: [
                {
                    name: 'Yamaha Pacifica 112V Electric Guitar, Black',
                    price: 5000.00,
                    quantity: 1,
                    condition: 'BrandNew',
                    deliveryFee: 500.00,
                    rating: 4.0,
                    imageUrl: 'https://example.com/image1.jpg' // replace with actual image URL
                }
            ]
        },
        {
            id: '68e74314cfb62',
            date: '2024-06-28 10:29:41',
            grandTotal: 10000.00,
            deliveryStatus: 'Pending',
            items: [
                {
                    name: 'Yamaha Pacifica 112V Electric Guitar, Black',
                    price: 5000.00,
                    quantity: 1,
                    condition: 'BrandNew',
                    deliveryFee: 500.00,
                    rating: 4.0,
                    imageUrl: 'https://example.com/image2.jpg' // replace with actual image URL
                }
            ]
        }
    ];

    return (
        <Box  sx={{ p:3}}>
            <Invoice/>
            <Typography variant="h4" gutterBottom>
                Purchasing History
            </Typography>
            <Divider sx={{ marginBottom: 4 }} />

            {orders.map((order) => (
                <Card sx={{ marginBottom: 4 }} key={order.id}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Order ID: {order.id}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Date: {order.date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Grand Total: Rs. {order.grandTotal.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Delivery Status: {order.deliveryStatus}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 2 }} />
                        {order.items.map((item, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={12} sm={2}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.imageUrl}
                                        alt={item.name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            Rs. {item.price.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Condition: {item.condition}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Delivery Fee: Rs. {item.deliveryFee.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2">
                                            Quantity: {item.quantity}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                            <Typography variant="body1" sx={{ marginRight: 1 }}>
                                                Total: Rs. {(item.price + item.deliveryFee).toFixed(2)}
                                            </Typography>
                                            <Rating value={item.rating} precision={0.5} readOnly />
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
