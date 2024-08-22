import React, { useContext } from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { ThemeContext } from '../../themecontext/ThemeContext';
import AdminDashboard from '../AdminDashboard';
const Settings = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminDashboard />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
        label="Dark Mode"
      />
    </Box>
    </Box>
  );
};

export default Settings;