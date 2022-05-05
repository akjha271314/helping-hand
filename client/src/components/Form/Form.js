import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        contact: '', profession: '', experience: '', description: '', aadhaar: '', tags: '', selectedFile: ''
    });
    const post = useSelector(state => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])
    
    const clear = () => {
        setCurrentId(0);
        setPostData({
            contact: '', profession: '', experience: '', description: '', aadhaar: '', tags: '', selectedFile: ''
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else{
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    }


    if(!user?.result?.name){
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your Job Profile.
                </Typography>
            </Paper>
        )
    }
    
    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h4">{currentId ? 'Edit' : 'Create'} Job Profile</Typography>
                <TextField 
                name="profession" 
                variant="outlined" 
                label="Profession" 
                fullWidth
                value={postData.profession}
                onChange={(e) => setPostData({ ...postData, profession: e.target.value })}
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
                multiline
                rows={4}
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
