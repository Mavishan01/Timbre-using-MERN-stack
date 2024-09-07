import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AdminDashboard from '../../AdminDashboard';

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands'); // Adjust the URL based on your backend routes
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleAddBrand = async () => {
    const brandData = { name: brandName};

    if (editingIndex !== null) {
      const brandToUpdate = brands[editingIndex];

      // Perform the update
      const response = await fetch(`/api/brands/update/${brandToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(brandData),
      });

      if (!response.ok) {
        throw new Error('Error updating brand');
      }

      const updatedBrand = await response.json();
      const updatedBrands = brands.map((brand, index) =>
        index === editingIndex ? updatedBrand : brand
      );

      setBrands(updatedBrands);
      setEditingIndex(null);
      window.location.reload()
    } else {
      const newBrand = { name: brandName};

      try {
        const response = await fetch('/api/brands', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBrand),
        });

        const data = await response.json();
        setBrands([...brands, data]);
      } catch (error) {
        console.error('Error adding brands:', error);
      }
    }
    setBrandName('');
  };

  const handleEditBrand = (index) => {
    const brand = brands[index];
    setBrandName(brand.name);
    setEditingIndex(index);
  };

  const handleDeleteBrand = async (index) => {
    const categoryToDelete = brands[index];

    try {
      // Send DELETE request to the server
      const response = await fetch(`/api/brands/delete/${categoryToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting brand');
      }

      // Remove category from local state if the deletion is successful
      setBrands(brands.filter((_, i) => i !== index));
    } catch (error) {
    console.error('Error deleting brand:', error);
  }
};

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
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
        <Button onClick={handleAddBrand} variant="contained" color="primary" sx={{backgroundColor:'black' ,'&:hover': { backgroundColor: 'black', color: 'white' }}}>
          {editingIndex !== null ? 'Update Brand' : 'Add Brand'}
        </Button>
      </Box>

      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="brand table">
            <TableHead>
              <TableRow>
                <TableCell>Brand Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands.map((brand, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {brand.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEditBrand(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteBrand(index)}>
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

export default BrandManagement;