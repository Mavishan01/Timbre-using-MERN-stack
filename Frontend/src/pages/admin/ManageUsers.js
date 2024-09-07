import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { ToggleOff, ToggleOn } from '@mui/icons-material';
import AdminDashboard from '../AdminDashboard';
const ManageUsers = () => {
  const [users, setUsers] = useState([
    // Example users
    { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false },
  ]);

  const handleToggleActive = (userId) => {
    // Toggle the active status of the user
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
  };

  useEffect(() => {
    fetch('/api/customers/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>

        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>

        {/* Display the list of users */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            User List
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Registered Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.first_name} {user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageUsers;