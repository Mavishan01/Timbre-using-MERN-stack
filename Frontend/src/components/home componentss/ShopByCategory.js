import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";


const categories = [
  {
    label: "GUITARS",
    image: "url_to_guitar_image", // Replace with actual image URL
    path: "/products/:productType", // Set the correct path
  },
  {
    label: "DRUMS AND PERCUSSION",
    image: "url_to_drums_image", // Replace with actual image URL
    path: "/products/:productType",
  },
  {
    label: "VIOLINS",
    image: "url_to_violin_image", // Replace with actual image URL
    path: "/products/:productType", // Set the correct path
  },
  {
    label: "LIVE SOUND & PRO AUDIO",
    image: "url_to_live_sound_image", // Replace with actual image URL
    path: "/products/:productType", // Set the correct path
  },
  {
    label: "KEYBOARDS",
    image: "url_to_keyboards_image", // Replace with actual image URL
    path: "/products/:productType", // Set the correct path
  },
];

const ShopByCategory = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={5} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={2} key={category.label}>
            <Card>
              <CardActionArea onClick={() => handleNavigation(category.path)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.label}
                  style={{
                    borderRadius: "50%",
                    width: "60%",
                    margin: "auto",
                    padding: "10px",
                  }}
                />
                <CardContent>
                  <Typography variant="body1" component="p" align="center">
                    {category.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShopByCategory;
