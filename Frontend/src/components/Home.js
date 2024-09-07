import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import CarouselComponent from "./CarouselComponent";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [mostRatedItems, setMostRatedItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetchData = async () => {
      try {
        const newArrivalsResponse = await fetch("/api/products/new-arrivals");
        const newArrivalsData = await newArrivalsResponse.json();
        if (newArrivalsData.message === "Success") {
          setNewArrivals(newArrivalsData.products);
        } else {
          console.log(newArrivalsData.message);
        }
        const mostRatedResponse = await fetch("/api/products/most-rated");
        const mostRatedData = await mostRatedResponse.json();
        if (mostRatedData.message === "Success") {
          setMostRatedItems(mostRatedData.products);
        } else {
          console.log(mostRatedData.message);
        }
        await fetchCategories();
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ padding: 2 }}>
      <CarouselComponent />
      <Typography variant="h4" component="h2" gutterBottom sx={{ paddingBottom: '30px', paddingTop: '40px', fontWeight: 'bold' }}>
        Shop by Category
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 12,
          justifyItems: "center",
          mb: 4,
        }}
      >
        {categories.map((category) => (
          <Box
            key={category._id}
            sx={{ textAlign: "center", cursor: "pointer" }}
            onClick={() =>
              navigate("/products", { state: { categoryId: category._id } })
            }
          >
            <img
              src={
                "http://localhost:4000/categories/" + category.image ||
                "https://via.placeholder.com/100"
              }
              alt={category.name}
              style={{ borderRadius: "50%", width: 160, height: 160 }}
            />
            <Typography variant="body1">{category.name}</Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="h4" component="h2" gutterBottom sx={{ paddingBottom: '30px', paddingTop: '40px', fontWeight: 'bold' }}>
        Most Rated Items
      </Typography>
      <Grid container spacing={4}>
        {mostRatedItems.map((item) => (
          <Grid item xs={12} sm={6} md={2} key={item.title}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" component="h2" sx={{ paddingBottom: '30px', paddingTop: '40px', fontWeight: 'bold' }} gutterBottom>
        New Arrivals
      </Typography>
      <Grid container spacing={4}>
        {newArrivals.map((item) => (
          <Grid item xs={12} sm={6} md={2} key={item._id}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;