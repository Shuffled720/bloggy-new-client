import React, { useEffect, useContext } from 'react'
import { AddCircle } from '@mui/icons-material';

import { Paper } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { API } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';


const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    useEffect(() => {
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    });

    const savePost = async () => {
        await API.createPost(post);
        navigate('/');
    }
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

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
            ></Paper>
            <Box component="form" noValidate sx={{ mt: 1 }}>

                <label htmlFor="fileInput">
                    <AddCircle fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    fullWidth
                    id="title"
                    label="title "
                    name="title"
                    autoComplete="title"
                    autoFocus
                />
                <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    fullWidth
                    multiline
                    rows={6}
                    name="description"
                    label="Post-Body"
                    type="Post-Body"
                    id="Post-Body"
                />

                <Button
                    onClick={() => savePost()}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>

            </Box>
        </>
    )
}

export default CreatePost