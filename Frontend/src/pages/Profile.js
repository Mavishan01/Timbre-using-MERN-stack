import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Avatar,
  Paper,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    customerId: "CUST12345", // Sample Customer ID
    nic: "982745678V",        // Sample NIC
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Music Street, Melody City, NY",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    // Handle save logic here, e.g., API call to update profile
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <Container
      component={Paper}
      sx={{
        padding: 4,
        maxWidth: 800,
        marginTop: 4,
        marginBottom: 4,
        boxShadow: 4,
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        marginBottom={4}
      >
        <Avatar
          alt={`${profile.firstName} ${profile.lastName}`}
          sx={{
            width: 120,
            height: 120,
            marginRight: { xs: 0, sm: 4 },
            marginBottom: { xs: 2, sm: 0 },
          }}
        >
          {profile.firstName[0]}
          {profile.lastName[0]}
        </Avatar>
        <Box>
          <Typography variant="h4" component="div">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Customer ID: {profile.customerId}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            NIC: {profile.nic}
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        marginTop={4}
        gap={2}
      >
        {editMode ? (
          <>
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              startIcon={<CancelIcon />}
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            color="primary"
            onClick={handleEdit}
          >
            Edit Profile
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
