import React, { useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddCategory = () => {
    if (editingIndex !== null) {
      const updatedCategories = categories.map((category, index) =>
        index === editingIndex ? categoryName : category
      );
      setCategories(updatedCategories);
      setEditingIndex(null);
    } else {
      setCategories([...categories, categoryName]);
    }
    setCategoryName('');
  };

  const handleEditCategory = (index) => {
    setCategoryName(categories[index]);
    setEditingIndex(index);
  };

  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <Box>
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
        <Button onClick={handleAddCategory} variant="contained" color="primary">
          {editingIndex !== null ? 'Update Category' : 'Add Category'}
        </Button>
      </Box>
      <List>
        {categories.map((category, index) => (
          <ListItem key={index}>
            <ListItemText primary={category} />
            <IconButton onClick={() => handleEditCategory(index)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeleteCategory(index)} color="secondary">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategoryManagement;