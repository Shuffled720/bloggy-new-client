import React from 'react'
import Grid from '@mui/material/Grid';

import Posts from '../components/Posts';
import { Paper } from '@mui/material';

const Home = () => {
    return (
        <>
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    height: '30vh',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${'https://source.unsplash.com/random?wallpapers'}})`,
                }}
            >
            </Paper>
            <center>
                <Grid container item xs={12} sm={10} lg={12}>
                    <Posts />
                </Grid>
            </center>
        </>
    )
}

export default Home