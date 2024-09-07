import React, { useEffect, useState } from 'react';
import FilterBox from '../components/FilterBox';
import { Box, Typography, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const initialCategoryId = location.state?.categoryId || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/');
        const data = await response.json();
        setProducts(data);
        setAllProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  const handleSetProducts = (filteredProducts) => {
    setProducts(filteredProducts);
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ flexShrink: 0, width: 400, overflow: 'auto' }}>
        <FilterBox
          onSet={handleSetProducts}
          products={products}
          allProducts={allProducts}
          initialCategoryId={initialCategoryId}
        />
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2, overflowY: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Products
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} item={product} />
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No products available.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductListingPage;