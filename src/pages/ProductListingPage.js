// ProductListingPage.js
import React from 'react';
import FilterBox from '../components/FilterBox';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const ProductListingPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <FilterBox />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {/* Your product listing goes here */}
        <Typography variant="h4">Product Listings</Typography>
        {/* Example product cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Map through your products and render them here */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductListingPage;
