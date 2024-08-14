import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Typography, TextField } from '@mui/material';
import AddBrands from './AddBrands';

const FilterBox = () => {
  const [category, setCategory] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const [quantity, setQuantity] = useState([1, 10]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null); // State to store error messages

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setBrands(json); // Set the fetched brands in state
      } catch (err) {
        console.error('Failed to fetch brands:', err);
        setError(err.message); // Set the error message in state
      }
    };

    fetchBrands();
  }, []);
  
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
      <AddBrands/>

      <FormControl component="fieldset" margin="normal">
        <Typography variant="subtitle1">Brands</Typography>
        {brands && brands.map((brand) => (
          <FormControlLabel
            key={brand._id} // Assuming each brand has a unique _id
            control={
              <Checkbox 
                value={brand.name} // Assuming each brand has a 'name' field
                onChange={handleCheckboxChange}
              />
            }
            label={brand.name}
          />
        ))}
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
