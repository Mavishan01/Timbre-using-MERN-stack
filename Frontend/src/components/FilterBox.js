import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Typography, TextField } from '@mui/material';
import AddBrands from './AddBrands';
import { useNavigate } from 'react-router-dom';

const FilterBox = () => {
  //const [category, setCategory] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const [quantity, setQuantity] = useState([1, 10]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();

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

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setCategories(json); // Set the fetched categories in state
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message); // Set the error message in state
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    navigate(`/products/${selectedCategory.toLowerCase()}`)
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
      <AddBrands />

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
