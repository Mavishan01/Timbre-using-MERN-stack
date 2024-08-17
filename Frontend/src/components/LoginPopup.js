import React, { useState, useEffect, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPopup = ({ open, handleClose }) => {
  const { login } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState(""); // To handle general errors
  const [isAdmin, setIsAdmin] = useState(false); // Track if admin login

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
      setGeneralError(""); // Reset general error
      setIsAdmin(false); // Reset admin state
    }
  }, [open]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Example: Password should be at least 6 characters long
  };

  const handleLogin = async () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");
    setGeneralError(""); // Reset errors

    if (email.length === 0) {
      setEmailError("Please enter an email address.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (password.length === 0) {
      setPasswordError("Please enter a password.");
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password should be at least 6 characters long.");
      valid = false;
    }

    if (valid) {
      try {
        await login(email, password, isAdmin); // Use login from AuthContext
        handleClose(); // Close the popup after login
        // Redirect based on role
        if (isAdmin) {
          navigate('/admin/dashboard'); // Redirect to admin dashboard
        } else {
          navigate('/'); // Redirect to user dashboard or default page
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        setGeneralError("Login failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
        <Button
          onClick={() => setIsAdmin(!isAdmin)}
          color={isAdmin ? "secondary" : "primary"}
          fullWidth
          variant="text"
        >
          {isAdmin ? "Login as User" : "Login as Admin"}
        </Button>
        {generalError && <p style={{ color: 'red' }}>{generalError}</p>} {/* Display general error */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
        <Button onClick={() => {
          // Handle signup logic if needed
          // e.g., redirect to signup page or open a signup dialog
        }} color="secondary">
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPopup;
