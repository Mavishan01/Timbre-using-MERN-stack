import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const categories = {
  Guitars: [
    "Acoustic Guitars",
    "Acoustic-Electric Guitars",
    "Electric Guitars",
    "Bass Guitars",
    "Ukuleles",
    "Guitar Amplifiers",
    "Guitar Pedals",
    "Guitar Strings",
  ],
  Violins: ["Violins"],
  "Drums and Percussions": ["Drums", "Percussions"],
  "Keyboards and Pianos": ["Keyboards", "Pianos"],
  "Live Sounds and Pro Audio": ["Live Sound Equipment", "Pro Audio Equipment"],
};

const PopoverMenu = ({ anchorEl, open, handleClose }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          width: "100%", // Full width
          display: "flex",
          flexDirection: "column",
          p: 2,
          maxHeight: "300px", // Limit the height of the popover (Optional)
          overflow: "auto", // Allow scrolling if content exceeds max height
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        {Object.keys(categories).map((category) => (
          <Box key={category} sx={{ width: "20%", textAlign: "left" }}>
            <Typography
              variant="h6"
              sx={{ cursor: "pointer", mb: 1, fontWeight: "bold" }}
            >
              {category}
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              {categories[category].map((item) => (
                <Typography key={item} sx={{ pl: 0 }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Popover>
  );
};

export default PopoverMenu;
