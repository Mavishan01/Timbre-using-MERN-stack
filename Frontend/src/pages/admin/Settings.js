import React, { useContext } from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { ThemeContext } from '../../themecontext/ThemeContext';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
        label="Dark Mode"
      />
    </Box>
  );
};

export default Settings;