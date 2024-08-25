import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AdminDashboard from '../../AdminDashboard';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories'); // Adjust the URL based on your backend routes
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    const categoryData = { name: categoryName, image: categoryImage };

    if (editingIndex !== null) {
      // Update existing category
      const categoryToUpdate = categories[editingIndex];
      
      // Perform the update
      const response = await fetch(`/api/categories/update/${categoryToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Error updating category');
      }

      const updatedCategory = await response.json();
      const updatedCategories = categories.map((category, index) =>
        index === editingIndex ? updatedCategory : category
      );
      setCategories(updatedCategories);
      setEditingIndex(null);
      window.location.reload()
    } else {
      const newCategory = { name: categoryName, image: categoryImage };

      try {
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCategory),
        });

        const data = await response.json();
        setCategories([...categories, data]);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
    setCategoryName('');
    setCategoryImage('');
  };

  const handleEditCategory = (index) => {
    const category = categories[index];
    setCategoryName(category.name);
    setCategoryImage(category.image);
    setEditingIndex(index);
  };

  const handleDeleteCategory = async (index) => {
    const categoryToDelete = categories[index];

    try {
      // Send DELETE request to the server
      const response = await fetch(`/api/categories/delete/${categoryToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting category');
      }

      // Remove category from local state if the deletion is successful
      setCategories(categories.filter((_, i) => i !== index));
    } catch (error) {
    console.error('Error deleting category:', error);
  }
};

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Manage Categories
        </Typography>
        <Box>
          <TextField
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={categoryImage}
            onChange={(e) => setCategoryImage(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleAddCategory} variant="contained" color="primary">
            {editingIndex !== null ? 'Update Category' : 'Add Category'}
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
                    <img src={category.image} alt={category.name} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEditCategory(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteCategory(index)}>
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
