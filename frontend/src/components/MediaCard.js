import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
    Link
} from "react-router-dom";


export default function MediaCard(
    {
        title,
        description,
        image,
        link,
        status
    }
) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" fontWeight="bold" component="div">
            {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
            {status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={link} color="warning" variant='outlined'  size="small">Detaylar</Button>
      </CardActions>
    </Card>
  );
}
