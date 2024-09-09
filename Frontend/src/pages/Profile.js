import React, { useEffect, useState } from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Ensure this is installed via npm/yarn
import toast from "react-hot-toast";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    address: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken.id;
        fetchCustomerDetails(customerId);
      } catch (error) {
        toast.error(`Invalid token: ${error.message}`);
        navigate("/");
      }
    } else {
      toast.error("No token found, redirecting to login.");
      navigate("/");
    }
  }, [navigate]);

  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await fetch(`/api/customers/${customerId}`);
      if (!response.ok) {
        throw new Error(`Failed to load customer details: ${response.statusText}`);
      }
      const data = await response.json();
      setProfile(data.customer || {});
    } catch (error) {
      toast.error(`Error fetching customer details: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!profile.first_name) tempErrors.first_name = "First Name is required.";
    if (!profile.last_name) tempErrors.last_name = "Last Name is required.";
    if (!profile.address) tempErrors.address = "Address is required.";
    if (!profile.mobile) tempErrors.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(profile.mobile))
      tempErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!profile.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(profile.email))
      tempErrors.email = "Enter a valid email address.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setErrors({});
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken.id;

        const response = await fetch(`/api/customers/update/${customerId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        });

        if (response.ok) {
          toast.success("Profile updated successfully!");
          setEditMode(false);
        } else {
          throw new Error("Failed to update profile.");
        }
      }
    } catch (error) {
      toast.error(`Error updating profile: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

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
          alt={`${profile.first_name || ""} ${profile.last_name || ""}`}
          sx={{
            width: 120,
            height: 120,
            marginRight: { xs: 0, sm: 4 },
            marginBottom: { xs: 2, sm: 0 },
          }}
        >
          {profile.first_name ? profile.first_name[0] : ""}
          {profile.last_name ? profile.last_name[0] : ""}
        </Avatar>
        <Box>
          <Typography variant="h4" component="div">
            {profile.first_name || ""} {profile.last_name || ""}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Customer ID: {profile._id || ""}
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            value={profile.first_name || ""}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            value={profile.last_name || ""}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={profile.address || ""}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="mobile"
            value={profile.mobile || ""}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.mobile}
            helperText={errors.mobile}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            disabled={!editMode}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" marginTop={4} gap={2}>
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
          <>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              color="primary"
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
            <Button
              startIcon={<LogoutIcon />}
              variant="outlined"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
