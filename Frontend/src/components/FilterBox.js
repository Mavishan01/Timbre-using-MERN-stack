import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Typography, TextField } from '@mui/material';

const FilterBox = () => {
  const [category, setCategory] = useState('');
  const [checkedItems, setCheckedItems] = useState([]); // Remove this if unused
  const [quantity, setQuantity] = useState([1, 10]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setCheckedItems((prev) => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleQuantityChange = (event, newValue) => {
    setQuantity(newValue);
  };

  return (
    <Box sx={{ width: 250, padding: 2, borderRight: '1px solid #ccc' }}>
      <Typography variant="h6">Filters</Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="fashion">Fashion</MenuItem>
          <MenuItem value="home">Home</MenuItem>
          {/* Add more categories as needed */}
        </Select>
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <Typography variant="subtitle1">Brands</Typography>
        <FormControlLabel
          control={<Checkbox value="brandA" onChange={handleCheckboxChange} />}
          label="Brand A"
        />
        <FormControlLabel
          control={<Checkbox value="brandB" onChange={handleCheckboxChange} />}
          label="Brand B"
        />
        {/* Add more brands as needed */}
      </FormControl>

      <Typography variant="subtitle1" gutterBottom>Price Range</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          sx={{ width: '45%' }}
        />
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          sx={{ width: '45%' }}
        />
      </Box>
    </Box>
  );
};

export default FilterBox;
