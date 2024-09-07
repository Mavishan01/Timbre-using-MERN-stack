import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ChromePicker } from 'react-color'; // Color picker library
import AdminDashboard from '../../AdminDashboard';

const ColorManagement = () => {
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState('');
  const [colorHex, setColorHex] = useState('#000000'); // Default color
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch('/api/colors'); // Adjust the URL based on your backend routes
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, []);

  const handleAddColor = async () => {
    const colorData = { name: colorName, hex: colorHex };

    if (editingIndex !== null) {
      const colorToUpdate = colors[editingIndex];

      // Perform the update
      const response = await fetch(`/api/colors/update/${colorToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colorData),
      });

      if (!response.ok) {
        throw new Error('Error updating color');
      }

      const updatedColor = await response.json();
      const updatedColors = colors.map((color, index) =>
        index === editingIndex ? updatedColor : color
      );

      setColors(updatedColors);
      setEditingIndex(null);
      window.location.reload();
    } else {
      try {
        const response = await fetch('/api/colors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(colorData),
        });

        const data = await response.json();
        setColors([...colors, data]);
      } catch (error) {
        console.error('Error adding color:', error);
      }
    }
    setColorName('');
    setColorHex('#000000'); // Reset to default
  };

  const handleEditColor = (index) => {
    const color = colors[index];
    setColorName(color.name);
    setColorHex(color.hex);
    setEditingIndex(index);
  };

  const handleDeleteColor = async (index) => {
    const colorToDelete = colors[index];

    try {
      // Send DELETE request to the server
      const response = await fetch(`/api/colors/delete/${colorToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting color');
      }

      // Remove color from local state if the deletion is successful
      setColors(colors.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting color:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Manage Colors
        </Typography>
        <Box>
          <TextField
            label="Color Name"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <ChromePicker
            color={colorHex}
            onChange={(color) => setColorHex(color.hex)}
          />
          <Button onClick={handleAddColor} variant="contained" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'black', color: 'white' } }}>
            {editingIndex !== null ? 'Update Color' : 'Add Color'}
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="color table">
            <TableHead>
              <TableRow>
                <TableCell>Color Name</TableCell>
                <TableCell>Color Hex</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {colors.map((color, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {color.name}
                  </TableCell>
                  <TableCell>{color.hex}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEditColor(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteColor(index)}>
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

export default ColorManagement;