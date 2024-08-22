import React, { useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const ModelManagement = () => {
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddModel = () => {
    if (editingIndex !== null) {
      const updatedModels = models.map((model, index) =>
        index === editingIndex ? modelName : model
      );
      setModels(updatedModels);
      setEditingIndex(null);
    } else {
      setModels([...models, modelName]);
    }
    setModelName('');
  };

  const handleEditModel = (index) => {
    setModelName(models[index]);
    setEditingIndex(index);
  };

  const handleDeleteModel = (index) => {
    setModels(models.filter((_, i) => i !== index));
  };

  return (
    <Box>
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
      <List>
        {models.map((model, index) => (
          <ListItem key={index}>
            <ListItemText primary={model} />
            <IconButton onClick={() => handleEditModel(index)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeleteModel(index)} color="secondary">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ModelManagement;