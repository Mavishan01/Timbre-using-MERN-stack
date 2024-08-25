import React, { useState, useEffect } from "react";
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

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [mobileError, setMobileError] = useState("");

    useEffect(() => {
        if (open) {
            // Reset form fields and error messages when the dialog is opened
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setAddress("");
            setMobile("");
            setGeneralError("");
            setFirstNameError("");
            setLastNameError("");
            setEmailError("");
            setPasswordError("");
            setAddressError("");
            setMobileError("");
        }
    }, [open]);

    const validateForm = () => {
        
        let isValid = true;

        // Reset all error messages
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");
        setAddressError("");
        setMobileError("");
        setGeneralError("");

        // Validate each field and set error messages if needed
        if (firstName.trim() === "") {
            setFirstNameError("First name is required");
            isValid = false;
        }
        if (lastName.trim() === "") {
            setLastNameError("Last name is required");
            isValid = false;
        }
        if (email.trim() === "") {
            setEmailError("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Enter a valid email address");
            isValid = false;
        }
        if (password.trim() === "") {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 3) {
            setPasswordError("Password should be at least 3 characters long.");
            isValid = false;
        }
        if (address.trim() === "") {
            setAddressError("Address is required");
            isValid = false;
        }
        if (mobile.trim() === "") {
            setMobileError("Mobile number is required");
            isValid = false;
        } else if (!/^\d{10}$/.test(mobile)) { // 10 digit numbers only
            setMobileError("Enter a valid 10-digit mobile number");
            isValid = false;
        }

        return isValid;
    };

    const handleSignup = async () => {

        if (!validateForm()) {
            return;
        }

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
                    error={!!firstNameError} // MUI prop to show red border if error exists
                    helperText={firstNameError} // MUI prop to show error message below the input
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={!!lastNameError}
                    helperText={lastNameError}
                />
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
                <TextField
                    margin="dense"
                    label="Address"
                    fullWidth
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={!!addressError}
                    helperText={addressError}
                />
                <TextField
                    margin="dense"
                    label="Mobile"
                    fullWidth
                    variant="outlined"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    error={!!mobileError}
                    helperText={mobileError}
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
