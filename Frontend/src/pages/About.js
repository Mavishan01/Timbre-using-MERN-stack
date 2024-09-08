import React from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const About = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to our music shop! We are dedicated to providing you with the best musical instruments and accessories.
        Our mission is to bring music into everyone's life by offering high-quality instruments at affordable prices.
        With a passion for music and an unwavering commitment to excellence, we strive to be your go-to destination for
        all things musical.
      </Typography>
      <Typography variant="body1" paragraph>
        For over 20 years, our shop has been a cornerstone in the music community. Whether you are a beginner or a
        seasoned professional, we offer a diverse selection of instruments to suit your needs. From string instruments
        to percussion, we have carefully curated our inventory to include products from trusted brands and artisans.
        Our knowledgeable and friendly staff are always available to assist you in finding the perfect instrument or accessory
        and to provide expert advice on maintenance and care.
      </Typography>
      <Typography variant="body1" paragraph>
        We believe that music is a universal language that brings people together. Our goal is to support musicians at
        every stage of their journey, whether you're just starting out or looking to enhance your collection. Explore our
        range of products and experience the joy of music with us. Thank you for choosing us as your musical partner.
      </Typography>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Guitar"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Guitars
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discover our wide range of guitars, from acoustic to electric, perfect for all styles and skill levels.
                Our guitars are selected for their exceptional sound quality and craftsmanship, ensuring you get the best
                experience possible, whether you're strumming at home or performing on stage.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://images.pexels.com/photos/6671709/pexels-photo-6671709.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Violin"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Violins
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our violins are crafted with precision and care, offering beautiful sound quality for both beginners and
                professionals. We offer a variety of sizes and styles, ensuring that you find the right fit for your
                musical needs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2g"
              alt="Drum"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Drums
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore our collection of drums and percussion instruments, designed to provide powerful and dynamic
                performances. From beginner sets to professional kits, we have everything you need to create the perfect
                rhythm and sound.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
