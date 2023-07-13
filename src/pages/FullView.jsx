import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataProvider';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../services/api';

//
import { getAccessToken } from '../services/LocalStorageService';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}
const FullView = () => {
    // const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const url = 'https://source.unsplash.com/random?wallpapers';
    const [post, setPost] = useState(initialPost);
    const { id } = useParams();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);


    //delete post
    const deleteBlog = async () => {
        const res = await axios.delete(`http://localhost:8000/delete/${id}`, {
            headers: {
                authorization: getAccessToken(),
            },
        });
        // console.log(id);
        // await API.deletePost(id);
        navigate('/');
    }
    return (
        <>
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${url})`,
                }}
            >
                {<img style={{ display: 'none' }} src={url} alt='banner' />}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                            <Typography>
                                Category:{post.categories}
                            </Typography>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {post.title}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {post.username}
                            </Typography>

                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Grid
                item
                xs={12}
                md={8}
                sx={{
                    '& .markdown': {
                        py: 3,
                    },
                }}
            >

                {
                    account.username === post.username &&
                    <>
                        <Link sx={{ px: 2 }} to={`/update/${post._id}`}><Edit color="primary" /></Link>
                        <Link sx={{ px: 2 }} to='#'> <Delete onClick={() => deleteBlog()} color="error" /></Link>
                    </>
                }
                <Divider />
                <Typography variant="h6" className="markdown" gutterBottom>
                    {post.description}
                </Typography>

            </Grid >
        </>
    )

}

export default FullView