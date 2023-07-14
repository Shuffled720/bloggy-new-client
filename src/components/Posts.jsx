import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { API } from '../services/api';
import { Grid } from '@mui/material';
import FeaturedPost from './FeaturedPost';
import { Box, Typography } from '@mui/material';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    useEffect(() => {
        const fetchPosts = async () => {
            let response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchPosts();
        // console.log(posts);
    }, [category]);


    return (
        <>
            {posts.length === 0 && <Box sx={{ m: 'auto' }}><Typography variant="h1" color="initial">No posts found</Typography></Box>}
            <Grid container spacing={4}>
                {posts.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                ))}
            </Grid>
        </>
    )



}

export default Posts