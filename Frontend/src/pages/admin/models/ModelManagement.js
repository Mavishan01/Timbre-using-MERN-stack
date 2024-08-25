import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AdminDashboard from '../../AdminDashboard';

const ModelManagement = () => {
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models'); // Adjust the URL based on your backend routes
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  const handleAddModel = async () => {
    const modelData = { name: modelName};

    if (editingIndex !== null) {
      const modelToUpdate = models[editingIndex];

      // Perform the update
      const response = await fetch(`/api/models/update/${modelToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modelData),
      });

      if (!response.ok) {
        throw new Error('Error updating model');
      }

      const updatedModel = await response.json();
      const updatedModels = models.map((model, index) =>
        index === editingIndex ? updatedModel : model
      );

      setModels(updatedModels);
      setEditingIndex(null);
      window.location.reload()
    } else {
      const newModel = { name: modelName};

      try {
        const response = await fetch('/api/models', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newModel),
        });

        const data = await response.json();
        setModels([...models, data]);
      } catch (error) {
        console.error('Error adding models:', error);
      }
    }
    setModelName('');
  };

  const handleEditModel = (index) => {
    const model = models[index];
    setModelName(model.name);
    setEditingIndex(index);
  };

  const handleDeleteModel = async (index) => {
    const modelToDelete = models[index];

    try {
      // Send DELETE request to the server
      const response = await fetch(`/api/models/delete/${modelToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting brand');
      }

      // Remove category from local state if the deletion is successful
      setModels(models.filter((_, i) => i !== index));
    } catch (error) {
    console.error('Error deleting model:', error);
  }
};

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Manage Models
      </Typography>
      <Box>
        <TextField
          label="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleAddModel} variant="contained" color="primary">
          {editingIndex !== null ? 'Update Model' : 'Add Model'}
        </Button>
      </Box>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="model table">
            <TableHead>
              <TableRow>
                <TableCell>Model Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {models.map((model, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {model.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEditModel(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteModel(index)}>
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

export default ModelManagement;