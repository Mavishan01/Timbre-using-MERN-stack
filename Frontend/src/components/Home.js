import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Sample data for categories, best sellers, and new arrivals
const categories = [
  { image: 'https://via.placeholder.com/100', name: 'Guitars', link: '/products/guitars' },
  { image: 'https://via.placeholder.com/100', name: 'Violins', link: '/products/violins' },
  { image: 'https://via.placeholder.com/100', name: 'Drums', link: '/products/drums' },
  { image: 'https://via.placeholder.com/100', name: 'Keyboards', link: '/products/keyboards' },
  { image: 'https://via.placeholder.com/100', name: 'Accessories', link: '/products/accessories' },
];

const bestSellers = [
  { image: 'https://via.placeholder.com/150', title: 'Guitar 1', price: '$100', link: '/products/guitar-1' },
  { image: 'https://via.placeholder.com/150', title: 'Guitar 2', price: '$120', link: '/products/guitar-2' },
  { image: 'https://via.placeholder.com/150', title: 'Violin 1', price: '$150', link: '/products/violin-1' },
  { image: 'https://via.placeholder.com/150', title: 'Drum 1', price: '$200', link: '/products/drum-1' },
  { image: 'https://via.placeholder.com/150', title: 'Keyboard 1', price: '$250', link: '/products/keyboard-1' },
  { image: 'https://via.placeholder.com/150', title: 'Accessory 1', price: '$30', link: '/products/accessory-1' },
  { image: 'https://via.placeholder.com/150', title: 'Accessory 2', price: '$40', link: '/products/accessory-2' },
  { image: 'https://via.placeholder.com/150', title: 'Accessory 3', price: '$50', link: '/products/accessory-3' },
  { image: 'https://via.placeholder.com/150', title: 'Accessory 4', price: '$60', link: '/products/accessory-4' },
  { image: 'https://via.placeholder.com/150', title: 'Accessory 5', price: '$70', link: '/products/accessory-5' }
];

const newArrivals = [
  { image: 'https://via.placeholder.com/150', title: 'New Guitar 1', price: '$110', link: '/products/new-guitar-1' },
  { image: 'https://via.placeholder.com/150', title: 'New Guitar 2', price: '$130', link: '/products/new-guitar-2' },
  { image: 'https://via.placeholder.com/150', title: 'New Violin 1', price: '$160', link: '/products/new-violin-1' },
  { image: 'https://via.placeholder.com/150', title: 'New Drum 1', price: '$210', link: '/products/new-drum-1' },
  { image: 'https://via.placeholder.com/150', title: 'New Keyboard 1', price: '$260', link: '/products/new-keyboard-1' }
];

const Home = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Banner Section */}
      <Box
        sx={{
          backgroundImage: 'url("https://via.placeholder.com/1200x300")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 300,
          marginBottom: 4
        }}
      />

      {/* Shop by Category Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        Shop by Category
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
        {categories.map((category) => (
          <Box key={category.name} sx={{ textAlign: 'center' }}>
            <Link href={category.link} sx={{ display: 'block', mb: 1 }}>
              <img src={category.image} alt={category.name} style={{ borderRadius: '50%', width: 100, height: 100 }} />
            </Link>
            <Typography variant="body1">{category.name}</Typography>
          </Box>
        ))}
      </Box>

      {/* Best Sellers Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        Best Sellers
      </Typography>
      <Grid container spacing={4}>
        {bestSellers.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Link to={item.link} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* New Arrivals Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        New Arrivals
      </Typography>
      <Grid container spacing={4}>
        {newArrivals.map((item) => (
          <Grid item xs={12} sm={6} md={2} key={item.title}>
            <Link to={item.link} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;