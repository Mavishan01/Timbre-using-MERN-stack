import React, { useState } from 'react';
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
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell> {/* Added Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="right">
                    {user.active ? 'Active' : 'Inactive'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color={user.active ? 'primary' : 'default'} onClick={() => handleToggleActive(user.id)}>
                      {user.active ? <ToggleOff /> : <ToggleOn />}
                    </IconButton>
                  </TableCell>
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