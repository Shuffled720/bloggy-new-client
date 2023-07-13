import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';

function FeaturedPost(props) {
    const { post } = props;
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }
    return (
        <Grid item xs={12} md={6}>
            <Link to={`full/${post._id}`}>
                <Card sx={{ display: 'flex', width: "100%" }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {addEllipsis(post.title, 7)}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post.categories}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {addEllipsis(post.description, 20)}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
                        </Typography>
                        <Typography variant="subtitle2" color="primary">
                            Author:{post.author}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        image={post.image || "https://source.unsplash.com/random?wallpapers"}
                        alt={post.imageLabel}
                        loading="lazy"
                    />
                </Card>
            </Link>

        </Grid>
    );
}



export default FeaturedPost;