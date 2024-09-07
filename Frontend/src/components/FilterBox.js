import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FilterBox = ({ onSet, products, allProducts, initialCategoryId }) => {
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
        if (initialCategoryId) {
          const matchingCategory = json.find(category => category._id === initialCategoryId);
          if (matchingCategory) {
            setSelectedCategory(initialCategoryId);
          }
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await fetch("/api/colors");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        setColors(json);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message);
      }
    };

    fetchBrands();
    fetchCategories();
    fetchColors()
  }, []);

  const applyFilters = () => {
    if (allProducts.length === 0) {
      console.log('Products not loaded yet.');
      return;
    }
  
    let filteredProducts = allProducts;
  
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(item => item.category_id._id === selectedCategory);
    }
  
    if (checkedItems.length > 0) {
      filteredProducts = filteredProducts.filter(item => checkedItems.includes(item.brand_id._id));
    }
  
    if (minPrice || maxPrice) {
      filteredProducts = filteredProducts.filter(item => {
        const price = item.price;
        return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
      });
    }
  
    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter(item => selectedColors.includes(item.color_id._id));
    }
  
    console.log('Filtered Products:', filteredProducts); // Verify filtered products here.
    onSet(filteredProducts);
  };
  

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategory(initialCategoryId);
    }
  }, [initialCategoryId]);

  useEffect(applyFilters, [checkedItems, selectedCategory, minPrice, maxPrice, selectedColors,allProducts]);



  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
      prev.includes(color)
        ? prev.filter(item => item !== color)
        : [...prev, color]
    );

  };


  return (
    <Box sx={{ width: 400, padding: 2, borderRight: '1px solid #ccc' }}>
      <Typography variant="h6">Filters</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
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
                value={brand._id}
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
            key={color._id}
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: color.hex,
              margin: 1,
              cursor: 'pointer',
              border: selectedColors.includes(color._id) ? '2px solid black' : 'none'
            }}
            onClick={() => handleColorChange(color._id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FilterBox;