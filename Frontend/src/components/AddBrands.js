import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function AddBrands() {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);


    const handleAddBrand = async (e) => {
        e.preventDefault();

        const brand = {name}
        const response = await fetch("/api/brands", {
            method:"POST",
            body: JSON.stringify(brand),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok)
        {
            setError(json.error)
        }

        if (response.ok){
            setName('')
            
            console.log("New workout added", json)
            // dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    
    };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        label="Brand Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddBrand}
      >
        Add
      </Button>
      {error && <p className="error">{error}</p>}
    </Box>
  );
}

export default AddBrands;
