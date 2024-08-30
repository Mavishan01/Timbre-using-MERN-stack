import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FilterBox = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [quantity, setQuantity] = useState([1, 10]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState(['#FF5733', '#33FF57', '#3357FF', '#F333FF']); // Example color options
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setBrands(json);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
        setError(err.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setCategories(json);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message);
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    navigate(`/products/${selectedCategory.toLowerCase()}`);
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

  const handleColorChange = (color) => {
    setSelectedColors((prev) => 
      prev.includes(color) ? prev.filter(item => item !== color) : [...prev, color]
    );
  };

  return (
    <Box sx={{ width: 250, padding: 2, borderRight: '1px solid #ccc' }}>
      <Typography variant="h6">Filters</Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <Typography variant="subtitle1">Brands</Typography>
        {brands && brands.map((brand) => (
          <FormControlLabel
            key={brand._id}
            control={
              <Checkbox 
                value={brand.name}
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

      <Typography variant="subtitle1" gutterBottom>Colors</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {colors.map((color) => (
          <Box
            key={color}
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: color,
              margin: 1,
              cursor: 'pointer',
              border: selectedColors.includes(color) ? '2px solid black' : 'none'
            }}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FilterBox;