import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiry: "",
    contactNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        marginTop: 12,
        marginBottom: 8,
        padding: 3,
        borderRadius: 1,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Give us feedback
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Contact No"
        name="contactNo"
        type="tel"
        value={formData.contactNo}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Enquiry"
        name="enquiry"
        value={formData.enquiry}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default Contact;
