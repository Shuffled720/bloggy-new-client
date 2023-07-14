import React, { useEffect } from 'react'
import { AddCircle } from '@mui/icons-material';

import { useState } from 'react';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { API } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';


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
    const [post, setPost] = useState(initialPost);
    const { id } = useParams();
    const url = 'https://source.unsplash.com/random?wallpapers';

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [id]);

    const savePost = async () => {
        await API.updatePost(post);
        navigate('/');
    }
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setPost({ ...post, picture: base64 });
    }

    return (
        <>

            <div className='banner'>
                <center>
                    <img height="200" src={post.picture || url} alt="" />
                </center>
            </div>

            <Box component="form" noValidate sx={{ mt: 1 }}>

                <label htmlFor="file-upload">
                    <AddCircle fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    name='myFile'
                    id="file-upload"
                    style={{ display: "none" }}
                    accept='.png,.jpeg,.jpg'
                    onChange={(e) => { handleFileUpload(e) }}
                />
                <TextField
                    onChange={(e) => handleChange(e)}
                    value={post.title}
                    margin="normal"
                    fullWidth
                    id="title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                />
                <TextField
                    onChange={(e) => handleChange(e)}
                    value={post.description}
                    margin="normal"
                    fullWidth
                    multiline
                    rows={6}
                    name="description"
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
function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}

export default CreatePost