import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        p: 4,
        mt: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 8, // Add padding on the left and right
      }}
    >
      {/* Contact details on the left */}
      <Box sx={{ mr: 4 }}> {/* Add margin-right to create space between contact details and links */}
        <Typography variant="h6" component="div">
          Contact Us
        </Typography>
        <Typography variant="body1" component="div">
          Shop Name
        </Typography>
        <Typography variant="body1" component="div">
          Address: 123 Music Lane, Melody City, 56789
        </Typography>
        <Typography variant="body1" component="div">
          Phone: (123) 456-7890
        </Typography>
        <Typography variant="body1" component="div">
          Email: info@musicshop.com
        </Typography>
      </Box>

      {/* Navigation links on the right */}
      <Box>
        <Link component={RouterLink} to="/about" color="inherit" sx={{ mx: 2 }}>
          About
        </Link>
        <Link component={RouterLink} to="/get-in-touch" color="inherit" sx={{ mx: 2 }}>
          Get in Touch
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
