import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginPopup = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
    }
  }, [open]);

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  const handleSignup = () => {
    // Handle signup logic here
    console.log("Signup:", { email, password });
  };

  const handleAdminLogin = () => {
    // Handle admin login logic here
    console.log("Admin Login:", { email, password });
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
          onChange={handleEmailChange}
          value={email}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
        <Button onClick={handleSignup} color="secondary">
          Sign Up
        </Button>
        <Button onClick={handleAdminLogin} color="error">
          Login as Admin
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPopup;
