import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    enquiry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      console.log("sending");
      const response = await fetch('/api/enquiries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setSubmissionStatus('Enquiry submitted successfully!');
      setFormData({
        name: "",
        email: "",
        contactNo: "",
        enquiry: "",
      });
    } catch (error) {
      setSubmissionStatus(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
      {submissionStatus && (
        <Typography variant="body1" color={submissionStatus.startsWith('Error') ? 'error' : 'success'} align="center" mt={2}>
          {submissionStatus}
        </Typography>
      )}
    </Box>
  );
};

export default Contact;