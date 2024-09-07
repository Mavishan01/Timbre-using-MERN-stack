import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminDashboard from "../../AdminDashboard";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const ManageProducts = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedImage, setselectedImage] = useState("");
  const [image, setImage] = useState();

  const [error, setError] = useState(null); // State to store error messages
  const [fillingErrors, setFillingErrors] = useState({}); // errors for not filling the fields

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setCategories(json);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
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
        console.error("Failed to fetch brands:", err);
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
      } catch (err) {
        console.error("Failed to fetch models:", err);
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
      } catch (err) {
        console.error("Failed to fetch categories:", err);
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
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message);
      }
    };

    fetchCategories();
    fetchBrands();
    fetchModels();
    fetchColors();
    fetchProducts();
  }, []);

  const [productDetails, setProductDetails] = useState({
    brand: "",
    model: "",
    color: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
    image: ""
    // Added description field
  });

  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [editIndex, setEditIndex] = useState(null); // State to track which product is being edited

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = value < 0 ? 0 : value;
    console.log(newValue);

    setProductDetails({
      ...productDetails,
      [name]: newValue,
    });

    if (newValue) {
      setFillingErrors({
        ...fillingErrors,
        [name]: "", // Clear the error for this field
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!productDetails.image) newErrors.image = "Image is required";
    if (!productDetails.brand) newErrors.brand = "Brand is required";
    if (!productDetails.model) newErrors.model = "Model is required";
    if (!productDetails.color) newErrors.color = "Color is required";
    if (!productDetails.price) newErrors.price = "Price is required";
    if (!productDetails.category) newErrors.category = "Category is required";
    if (!productDetails.quantity) newErrors.quantity = "Quantity is required";

    // If there are errors, prevent submission and show errors
    if (Object.keys(newErrors).length > 0) {
      setFillingErrors(newErrors);
      return;
    }

    // Clear errors if the validation passes
    setFillingErrors({});

    const brandName =
      brands.find((brand) => brand._id === productDetails.brand)?.name || "";
    const modelName =
      models.find((model) => model._id === productDetails.model)?.name || "";
    const categoryName =
      categories.find((category) => category._id === productDetails.category)
        ?.name || "";
    const colorName =
      colors.find((color) => color._id === productDetails.color)?.name || "";

    const productTitle =
      `${brandName} ${modelName} ${categoryName}, ${colorName}`.trim();
    const newProduct = {
      title: productTitle,
      brand_id: productDetails.brand, // Sending brand ID
      model_id: productDetails.model, // Sending model ID
      color_id: productDetails.color, // Sending color ID
      price: productDetails.price,
      category_id: productDetails.category, // Sending category ID
      quantity: productDetails.quantity,
      description: productDetails.description,
    };
    console.log(newProduct);
    try {
      let response;
      if (isEditing) {
        // Update existing product
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", newProduct.title);
        formData.append("brand_id", newProduct.brand_id);
        formData.append("model_id", newProduct.model_id);
        formData.append("color_id", newProduct.color_id);
        formData.append("price", newProduct.price);
        formData.append("category_id", newProduct.category_id);
        formData.append("quantity", newProduct.quantity);
        formData.append("description", newProduct.description);
        console.log(newProduct, image)
        response = await fetch(
          `/api/products/update/${products[editIndex]._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const updatedProduct = await response.json();
        const updatedProducts = products.map((product, index) =>
          index === editIndex ? updatedProduct.product : product
      );
        console.log(updatedProduct)

        setProducts(updatedProducts);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", newProduct.title);
        formData.append("brand_id", newProduct.brand_id);
        formData.append("model_id", newProduct.model_id);
        formData.append("color_id", newProduct.color_id);
        formData.append("price", newProduct.price);
        formData.append("category_id", newProduct.category_id);
        formData.append("quantity", newProduct.quantity);
        formData.append("description", newProduct.description);
        // Add new product
        response = await fetch("/api/products", {
          method: "POST",
          body: formData,
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
        brand: "",
        model: "",
        color: "",
        price: "",
        category: "",
        quantity: "",
        description: "",
        image: ""
      });
      setselectedImage('')
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Failed to add/update product:", err);
      setError(err.message); // Set the error message in state
    }
  };

  const handleDelete = async (index) => {
    const productToDelete = products[index];

    try {
      // Make a request to your backend to delete the product
      const response = await fetch(
        `/api/products/delete/${productToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the deletion was successful, update the state to remove the product
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        console.log("Product deleted successfully");
      } else {
        const data = await response.json();
        console.error("Failed to delete product:", data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (index) => {
    const productToEdit = products[index];
    console.log(productToEdit)
    // Find the correct names based on the IDs
    const brandId = productToEdit.brand_id?._id || "";
    const modelId = productToEdit.model_id?._id || "";
    const categoryId = productToEdit.category_id?._id || "";
    const colorId = productToEdit.color_id?._id || "";

    // Set the product details with the names for display
    setProductDetails({
      ...productToEdit,
      brand: brandId,
      model: modelId,
      category: categoryId,
      color: colorId,
    });
    // setProductDetails(productToEdit);
    setIsEditing(true);
    setEditIndex(index);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setselectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Update the productDetails state with the image file
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        image: file,
      }));
    }
  };


  return (
    <Box sx={{ display: "flex" }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Manage Products
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={4}>

              {fillingErrors.image && (
                <Typography color="error" variant="body2">
                  {fillingErrors.image}
                </Typography>
              )}
              <Box
                sx={{
                  width: "100%",
                  height: 342,
                  padding: 1,
                  border: "1px solid #a8a8a8",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: selectedImage
                      ? `url(${selectedImage})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  {!selectedImage && (
                    <Button
                      variant="text"
                      component="label"
                      startIcon={<FileUploadOutlinedIcon />}
                      sx={{
                        position: "absolute",
                        color: "grey",
                        borderColor: "grey",
                      }}
                    >
                      Upload Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>

                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={7} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!fillingErrors.brand}
                  >
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
                    {fillingErrors.brand && (
                      <Typography color="error" variant="body2">
                        {fillingErrors.brand}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!fillingErrors.model}
                  >
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
                    {fillingErrors.model && (
                      <Typography color="error" variant="body2">
                        {fillingErrors.model}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!fillingErrors.color}
                  >
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
                    {fillingErrors.color && (
                      <Typography color="error" variant="body2">
                        {fillingErrors.color}
                      </Typography>
                    )}
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
                      style: { textAlign: "right" },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">LKR</InputAdornment>
                      ),
                      inputMode: "decimal",
                    }}
                    fullWidth
                    error={!!fillingErrors.price}
                    helperText={fillingErrors.price}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!fillingErrors.category}
                  >
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
                    {fillingErrors.category && (
                      <Typography color="error" variant="body2">
                        {fillingErrors.category}
                      </Typography>
                    )}
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
                    error={!!fillingErrors.quantity}
                    helperText={fillingErrors.quantity}
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {isEditing ? "Update Product" : "Add Product"}
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
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell align="right">Price (LKR)</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={`http://localhost:4000/products/${product.img_card}`}
                        alt={product._id}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.brand_id?.name || "N/A"}</TableCell>
                    <TableCell>{product.model_id?.name || "N/A"}</TableCell>
                    <TableCell>{product.color_id?.name || "N/A"}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category_id?.name || "N/A"}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(index)}
                      >
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
