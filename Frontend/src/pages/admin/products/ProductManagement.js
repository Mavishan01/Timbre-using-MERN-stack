import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminDashboard from '../../AdminDashboard';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const ManageProducts = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);


  const [error, setError] = useState(null); // State to store error messages

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setCategories(json);
      }
      catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setBrands(json); // Set the fetched brands in state
      } catch (err) {
        console.error('Failed to fetch brands:', err);
        setError(err.message); // Set the error message in state
      }
    };

    const fetchModels = async () => {
      try {
        const response = await fetch("/api/models");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setModels(json);
      }
      catch (err) {
        console.error('Failed to fetch models:', err);
        setError(err.message);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await fetch("/api/colors");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setColors(json);
      }
      catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message);
      }
    };


    fetchCategories();
    fetchBrands();
    fetchModels();
    fetchColors();
  }, [])

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

    const newValue = value < 0 ? 0 : value;

    setProductDetails({
      ...productDetails,
      [name]: newValue,
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
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Manage Products
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  labelId="brand-label"
                  label="Brand"
                  name="brand"
                  value={productDetails.brand}
                  onChange={handleInputChange}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand._id} value={brand.name}>
                      {brand.name}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="model-label">Model</InputLabel>
                <Select
                  labelId="model-label"
                  label="Model"
                  name="model"
                  value={productDetails.model}
                  onChange={handleInputChange}
                >
                  {models.map((model) => (
                    <MenuItem key={model._id} value={model.name}>
                      {model.name}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="color-label">Color</InputLabel>
                <Select
                  labelId="color-label"
                  label="Color"
                  name="color"
                  value={productDetails.color}
                  onChange={handleInputChange}
                >
                  {colors.map((color) => (
                    <MenuItem key={color._id} value={color.name}>
                    {color.name}
                  </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  label="Category"
                  name="category"
                  value={productDetails.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
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
                inputProps={{ min: 0 }}
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
    </Box>
  );
};

export default ManageProducts;