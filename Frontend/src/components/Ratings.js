import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function Ratings({value}) {
    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating name="read-only" value={value} readOnly />
        </Box>
    );
}
