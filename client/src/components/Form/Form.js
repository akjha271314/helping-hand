import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        name: '', contact: '', profession: '', experience: '', description: '', aadhaar: '', tags: '', selectedFile: ''
    });
    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, postData));
            clear();
        } else{
            dispatch(createPost(postData));
            clear();
        }
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            name: '', contact: '', profession: '', experience: '', description: '', aadhaar: '', tags: '', selectedFile: ''
        });
    }
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h4">{currentId ? 'Edit' : 'Enter'} Your Details</Typography>
                <TextField 
                name="name" 
                variant="outlined" 
                label="Name" 
                fullWidth
                value={postData.name}
                onChange={(e) => setPostData({ ...postData, name: e.target.value })}
                />
                <TextField 
                name="contact" 
                variant="outlined" 
                label="Contact Number (Mobile)" 
                fullWidth
                value={postData.contact}
                onChange={(e) => setPostData({ ...postData, contact: e.target.value })}
                />
                <TextField 
                name="profession" 
                variant="outlined" 
                label="Profession" 
                fullWidth
                value={postData.profession}
                onChange={(e) => setPostData({ ...postData, profession: e.target.value })}
                />
                <TextField 
                name="experience" 
                variant="outlined" 
                label="Experience (in years)" 
                fullWidth
                value={postData.experience}
                onChange={(e) => setPostData({ ...postData, experience: e.target.value })}
                />
                <TextField 
                name="description" 
                variant="outlined" 
                label="Description" 
                fullWidth
                value={postData.description}
                onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                />
                <TextField 
                name="aadhaar" 
                variant="outlined" 
                label="Aadhaar" 
                fullWidth
                value={postData.aadhaar}
                onChange={(e) => setPostData({ ...postData, aadhaar: e.target.value })}
                />
                <TextField 
                name="tags" 
                variant="outlined" 
                label="Tags" 
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput} >
                    <FileBase 
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;
