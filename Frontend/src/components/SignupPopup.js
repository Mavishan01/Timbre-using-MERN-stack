import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';

const SignupPopup = ({ open, handleClose }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [generalError, setGeneralError] = useState("");

    const handleSignup = async () => {
        try {
            const response = await axios.post('/api/auth/signup', {
                fname: firstName,
                lname: lastName,
                email,
                password,
                address,
                mobile
            });

            localStorage.setItem('token', response.data.token);

            console.log('Signup successful:', response.data);
            handleClose();
        } catch (error) {
            console.error('Signup error:', error.response?.data || error.message);
            setGeneralError('Signup failed. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Account</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="First Name"
                    fullWidth
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Address"
                    fullWidth
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Mobile"
                    fullWidth
                    variant="outlined"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                {generalError && <p style={{ color: 'red' }}>{generalError}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSignup} color="primary">
                    Sign Up
                </Button>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SignupPopup;
