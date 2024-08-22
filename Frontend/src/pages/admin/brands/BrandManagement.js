import React, { useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddBrand = () => {
    if (editingIndex !== null) {
      const updatedBrands = brands.map((brand, index) =>
        index === editingIndex ? brandName : brand
      );
      setBrands(updatedBrands);
      setEditingIndex(null);
    } else {
      setBrands([...brands, brandName]);
    }
    setBrandName('');
  };

  const handleEditBrand = (index) => {
    setBrandName(brands[index]);
    setEditingIndex(index);
  };

  const handleDeleteBrand = (index) => {
    setBrands(brands.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Brands
      </Typography>
      <Box>
        <TextField
          label="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleAddBrand} variant="contained" color="primary">
          {editingIndex !== null ? 'Update Brand' : 'Add Brand'}
        </Button>
      </Box>
      <List>
        {brands.map((brand, index) => (
          <ListItem key={index}>
            <ListItemText primary={brand} />
            <IconButton onClick={() => handleEditBrand(index)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeleteBrand(index)} color="secondary">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BrandManagement;