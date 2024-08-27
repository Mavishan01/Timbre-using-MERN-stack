import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminDashboard from '../../AdminDashboard';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


const ManageProducts = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([]);
    const [products, setProducts] = useState([]);


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

        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                setProducts(json);
            }
            catch (err) {
                console.error('Failed to fetch products:', err);
                setError(err.message);
            }
        }

        fetchCategories();
        fetchBrands();
        fetchModels();
        fetchColors();
        fetchProducts();
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

    const [isEditing, setIsEditing] = useState(false); // State to track editing mode
    const [editIndex, setEditIndex] = useState(null); // State to track which product is being edited


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = value < 0 ? 0 : value;
        console.log(newValue)

        setProductDetails({
            ...productDetails,
            [name]: newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const brandName = brands.find(brand => brand._id === productDetails.brand)?.name || '';
        const modelName = models.find(model => model._id === productDetails.model)?.name || '';
        const categoryName = categories.find(category => category._id === productDetails.category)?.name || '';
        const colorName = colors.find(color => color._id === productDetails.color)?.name || '';

        const productTitle = `${brandName} ${modelName} ${categoryName}, ${colorName}`.trim();


        console.log(productTitle)
        const newProduct = {
            title: productTitle,
            brand_id: productDetails.brand,  // Sending brand ID
            model_id: productDetails.model,  // Sending model ID
            color_id: productDetails.color,  // Sending color ID
            price: productDetails.price,
            category_id: productDetails.category,  // Sending category ID
            quantity: productDetails.quantity,
            description: productDetails.description,
        };
        console.log(newProduct)
        try {
            let response;
            if (isEditing) {

                // Update existing product
                response = await fetch(`/api/products/update/${products[editIndex]._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const updatedProduct = await response.json();
                const updatedProducts = products.map((product, index) =>
                    index === editIndex ? updatedProduct : product
                );

                setProducts(updatedProducts);
                setIsEditing(false);
                setEditIndex(null);
            } else {
                console.log(newProduct)
                // Add new product
                response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const savedProduct = await response.json();
                window.location.reload();
                setProducts([...products, savedProduct]);
            }

            // Reset the form fields
            setProductDetails({
                brand: '',
                model: '',
                color: '',
                price: '',
                category: '',
                quantity: '',
                description: '',
            });
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Failed to add/update product:', err);
            setError(err.message); // Set the error message in state
        }
    };


    const handleDelete = async (index) => {
        const productToDelete = products[index];
    
        try {
            // Make a request to your backend to delete the product
            const response = await fetch(`/api/products/delete/${productToDelete._id}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                // If the deletion was successful, update the state to remove the product
                const updatedProducts = products.filter((_, i) => i !== index);
                setProducts(updatedProducts);
                console.log('Product deleted successfully');
            } else {
                const data = await response.json();
                console.error('Failed to delete product:', data.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (index) => {

        const productToEdit = products[index];
        // Find the correct names based on the IDs
        const brandName = brands.find(brand => brand._id === productToEdit.brand)?.name || '';
        const modelName = models.find(model => model._id === productToEdit.model)?.name || '';
        const categoryName = categories.find(category => category._id === productToEdit.category)?.name || '';
        const colorName = colors.find(color => color._id === productToEdit.color)?.name || '';

        // Set the product details with the names for display
        setProductDetails({
            ...productToEdit,
            brand: brandName,
            model: modelName,
            category: categoryName,
            color: colorName
        });
        // setProductDetails(productToEdit);
        setIsEditing(true);
        setEditIndex(index);
    };

    // const handleEdit = (index) => {
    //     const productToEdit = products[index];
    //     setProductDetails(productToEdit);  // Populate the form with the product details
    //     setIsEditing(true);                // Set editing mode
    //     setEditIndex(index);               // Store the index for saving later
    // };

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
                                        <MenuItem key={brand._id} value={brand._id}>
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
                                        <MenuItem key={model._id} value={model._id}>
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
                                        <MenuItem key={color._id} value={color._id}>
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
                                        <MenuItem key={category._id} value={category._id}>
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
                        {isEditing ? 'Update Product' : 'Add Product'}
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
                                    <TableCell>Title</TableCell>
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
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>{product.brand_id?.name || 'N/A'}</TableCell>
                                        <TableCell>{product.model_id?.name || 'N/A'}</TableCell>
                                        <TableCell>{product.color_id?.name || 'N/A'}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.category_id?.name || 'N/A'}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => handleEdit(index)}>
                                                <EditIcon />
                                            </IconButton>
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