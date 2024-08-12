import React from 'react';
// import SwipeableTextMobileStepper from './home componentss/SwipeableTextMobileStepper';
import { Typography } from '@mui/material'
import ShopByCategory from './home componentss/ShopByCategory';

const Home = () => {
  return <div>
    {/* <SwipeableTextMobileStepper/> */}
    <Typography variant="h4" gutterBottom padding={4}>
        Shop By Categories
      </Typography>
      <ShopByCategory/>
  </div>;
};

export default Home;
