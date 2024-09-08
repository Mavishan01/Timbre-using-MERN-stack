import React from 'react';
import { Container, Grid, Typography, Button, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const Invoice = () => {
  const theme = useTheme();
  const location = useLocation();
  const { newObj } = location.state || {};

  const orderData = {
    // Object containing all relevant order details
    invoiceNumber: '68a483e0d2a1e',
    date: '2024-07-27 08:35:24',
    customer: {
      name: 'Amanda Senmudi',
      address: '222/C, Aloka Uyana Road, Kalutara',
      email: 'hiranyagunaawardhane@gmail.com'
    },
    items: [
      // Array of items in the order
      {
        id: 1,
        name: 'Yamaha Pacifica 112V Electric Guitar, Black',
        unitPrice: 5000.00,
        quantity: 1
      },
      {
        id: 2,
        name: 'Fender Stratocaster, Sunburst',
        unitPrice: 75000.00,
        quantity: 1
      }
    ],
    // Totals and charges
    subTotal: 80000.00,
    deliveryCharges: 500.00,
    grandTotal: 80500.00
  };
  console.log("New Obj " + JSON.stringify(newObj))
  console.log("New Obj " + newObj.InvoiceItems[0].qty)

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3]
      }}
    >
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: theme.spacing(2) }}>
        <Grid item>
          <Typography variant="h4" sx={{ fontWeight: theme.typography.fontWeightBold, color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, }}>
            Timbre
          </Typography>
          <Typography>{newObj.address}</Typography>
          <Typography>{newObj.phone}</Typography>
          <Typography>{newObj.email}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              padding: theme.spacing(1, 3),
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
              color: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[800],
              },
            }}
          >
            Print or Save
          </Button>
        </Grid>
      </Grid>

      <Divider />

      {/* Invoice Info */}
      <Grid container justifyContent="space-between" sx={{ marginTop: theme.spacing(2) }}>
        <Grid item>
          <Typography variant="h6">Invoice #</Typography>
          <Typography>{newObj.order_id}</Typography>
          <Typography variant="h6">Date & Time</Typography>
          <Typography>{Date.now()}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Bill To:</Typography>
          <Typography>{newObj.cus_name}</Typography>
          <Typography>{newObj.cus_address}</Typography>
          <Typography>{newObj.cus_email}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ marginTop: theme.spacing(2) }} />

      {/* Product Details */}
      <Grid container sx={{ marginTop: theme.spacing(2) }}>
        <Grid item xs={1}>
          <Typography>#</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Order No & Item</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Unit Price</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Quantity</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Total</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: theme.spacing(1) }} />

      {newObj.InvoiceItems.map((item, index) => (
        <Grid container key={item.id}>
          <Grid item xs={1}>
            <Typography>{index + 1}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>{item.product_id.title}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{item.product_id.price}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{item.qty}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{item.qty * item.product_id.price}</Typography>
          </Grid>
        </Grid>
      ))}

      <Divider sx={{ marginTop: theme.spacing(2) }} />

      {/* Total Amount */}
      <Grid container justifyContent="flex-end" sx={{ marginTop: theme.spacing(2) }}>
        <Grid item xs={4}>
          
          <Typography sx={{ fontWeight: theme.typography.fontWeightBold }}>Grand Total</Typography>
        </Grid>
        <Grid item xs={2}>
          
          
          <Typography sx={{ fontWeight: theme.typography.fontWeightBold }}>{newObj.total}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" align="center" sx={{ marginTop: theme.spacing(3), fontWeight: theme.typography.fontWeightBold, color: theme.palette.error.main }}>
        Thank You!
      </Typography>
    </Container>
  );
};

export default Invoice;
