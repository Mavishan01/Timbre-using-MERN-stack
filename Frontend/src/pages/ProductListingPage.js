// ProductListingPage.js
import React, { useEffect, useState } from 'react';
import FilterBox from '../components/FilterBox';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductListingPage = () => {
  const { productType } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on the category
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?category=${productType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, [productType]);

  return (
    <Box sx={{ display: 'flex' }}>
      <FilterBox />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {productType.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </Typography>
        {/* Render product cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {products.length > 0 ? (
            products.map((product) => (
              <Box key={product._id} sx={{ width: '200px', margin: 2 }}>
                {/* Example product card */}
                <Box sx={{ border: '1px solid gray', borderRadius: '8px', padding: 2 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">{`$${product.price}`}</Typography>
                  <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} style={{ width: '100%', borderRadius: '4px' }} />
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No products available for {productType}.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductListingPage;
