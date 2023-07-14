import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataProvider';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../services/api';

//
import { getAccessToken } from '../services/LocalStorageService';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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
    }, [id]);


    //delete post
    const deleteBlog = async () => {
        await axios.delete(`http://localhost:8000/delete/${id}`, {
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

            <Divider />
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
                <div className='banner'>
                    <center>
                        <img height="200" src={post.picture || url} alt="" />
                    </center>
                </div>
                <Typography>
                    Category:{post.categories}
                </Typography>
                <Typography textTransform='capitalize' component="h2" variant="h4" color="inherit" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                    Author: {post.username}
                </Typography>

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