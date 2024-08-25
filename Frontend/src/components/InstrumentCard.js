import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HoverRating from './HoverRating';
import InstrumentImage from '../components/pexels-pixabay-39348.jpg';

export default function InstrumentCard() {
  return (
    <Card sx={{ maxWidth: 412, boxShadow: 'none' }}> {/* Add this line */}
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={InstrumentImage}
        alt="The instrument"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This is about the instrument
        </Typography>
        <Typography variant="h4" color="text.secondary">
          100$
        </Typography>
        <HoverRating />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}