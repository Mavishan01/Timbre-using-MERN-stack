import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import '../styles/styles.css';

const Banner = ({ item, contentPosition, paragraphIndex }) => {
    const totalItems = item.Items.length + 1;

    const content = (
        <Grid item xs={4} key="content">
            <CardContent className="content">
                <Typography fontSize="50px" className="title" fontWeight="bold">{item.Name}</Typography>
                <Typography fontSize="13px" className="paragraph" paddingTop={"100px"}>
                    {item[`Paragraph${paragraphIndex}`] || `Default text for Paragraph ${paragraphIndex} if none provided.`}
                </Typography>
            </CardContent>
        </Grid>
    );

    const mediaItems = item.Items.map((mediaItem, index) => (
        <Grid item xs={4} key={index}>
            <CardMedia className="media" image={mediaItem.Image} title={mediaItem.Name}>
                <Typography className="media-caption">{mediaItem.Name}</Typography>
            </CardMedia>
        </Grid>
    ));

    let bannerItems = [];
    if (contentPosition === "left") {
        bannerItems = [content, ...mediaItems];
    } else if (contentPosition === "right") {
        bannerItems = [...mediaItems, content];
    } else if (contentPosition === "middle") {
        bannerItems = [
            ...mediaItems.slice(0, totalItems / 2),
            content,
            ...mediaItems.slice(totalItems / 2),
        ];
    }

    return (
        <Card raised className="banner">
            <Grid container spacing={0} className="banner-grid">
                {bannerItems}
            </Grid>
        </Card>
    );
};

export default Banner;