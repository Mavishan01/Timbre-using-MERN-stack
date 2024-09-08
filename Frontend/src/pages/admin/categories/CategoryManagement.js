import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Image as ImageIcon } from "@mui/icons-material";
import AdminDashboard from "../../AdminDashboard";
import toast from 'react-hot-toast';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({ name: "", image: "" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories"); // Adjust the URL based on your backend routes
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validate = () => {
    let isValid = true;
    let errors = { name: "", image: "" };

    // Validate category name
    if (!categoryName.trim()) {
      errors.name = "Category name is required";
      isValid = false;
    }

    // Validate image file size (less than 1MB)
    if (image && image.size > 1048576) {
      errors.image = "Image size should be less than 1MB";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleAddCategory = async () => {
    if (!validate()) {
      return;
    }

    const categoryData = { name: categoryName, image: categoryImage };

    if (editingIndex !== null) {
      // Update existing category
      const categoryToUpdate = categories[editingIndex];
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("image", image);

      try {
        const response = await fetch(
          `/api/categories/update/${categoryToUpdate._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Error updating category");
        }
        const updatedCategory = await response.json();
        const updatedCategories = categories.map((category, index) =>
          index === editingIndex ? updatedCategory : category
        );
        setCategories(updatedCategories);
        setEditingIndex(null);
        window.location.reload();
        toast.success("Category Updated");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("image", image);
        const response = await fetch("/api/categories", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Error creating category");
        }
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
        toast.success("New Category Added");
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
    setCategoryName("");
    setCategoryImage("");
    setImagePreview("");
  };

  const handleEditCategory = (index) => {
    const category = categories[index];
    setCategoryName(category.name);
    setCategoryImage(category.image);
    setImagePreview("http://localhost:4000/categories/" + category.image);
    setEditingIndex(index);
  };

  const handleDeleteCategory = async (index) => {
    const categoryToDelete = categories[index];
    try {
      const response = await fetch(
        `/api/categories/delete/${categoryToDelete._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting category");
      }
      setCategories(categories.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 1048576) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "Image size should be less than 1MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file);
        setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Manage Categories
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
            margin="normal"
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<ImageIcon />}
              sx={{ marginRight: 2 }}
            >
              Choose Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt="Preview"
                sx={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: 1,
                  borderColor: "black",
                }}
              />
            )}
          </Box>
          {errors.image && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {errors.image}
            </Typography>
          )}
          <Button
            onClick={handleAddCategory}
            variant="contained"
            sx={{
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black", color: "white" },
            }}
          >
            {editingIndex !== null ? "Update Category" : "Add Category"}
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="category table">
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell>
                    <img
                      src={"http://localhost:4000/categories/" + category.image}
                      alt={category.name}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditCategory(index)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteCategory(index)}
                    >
                      <Delete />
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

export default CategoryManagement;
