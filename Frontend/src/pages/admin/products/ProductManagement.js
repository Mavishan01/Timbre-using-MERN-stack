import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageProducts = () => {
  const [productDetails, setProductDetails] = useState({
    brand: '',
    model: '',
    color: '',
    price: '',
    category: '',
    quantity: '',
    description: '', // Added description field
  });

  const [products, setProducts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the current product details to the products array
    setProducts([...products, productDetails]);

    // Reset the form fields
    setProductDetails({
      brand: '',
      model: '',
      color: '',
      price: '',
      category: '',
      quantity: '',
      description: '', // Reset description field
    });
  };

  const handleDelete = (index) => {
    // Filter out the product at the specified index
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Products
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Brand"
              variant="outlined"
              name="brand"
              value={productDetails.brand}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Model"
              variant="outlined"
              name="model"
              value={productDetails.model}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Color"
              variant="outlined"
              name="color"
              value={productDetails.color}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price (LKR)"
              variant="outlined"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
              inputProps={{
                step: "0.01",
                min: "0",
                style: { textAlign: 'right' },
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">LKR</InputAdornment>,
                inputMode: 'decimal',
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              variant="outlined"
              name="category"
              value={productDetails.category}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              name="quantity"
              type="number"
              value={productDetails.quantity}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={productDetails.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Product
        </Button>
      </form>

      {/* Display the list of products */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Product List
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Color</TableCell>
                <TableCell align="right">Price (LKR)</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell> {/* Added Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.model}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell align="right">
                    <IconButton color="secondary" onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
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

export default ManageProducts;