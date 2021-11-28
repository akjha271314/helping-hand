import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deletePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.profession} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize= "default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} fontFamily='Arial' variant="h6" gutterBottom>{post.profession}</Typography>
            <Typography className={classes.title} variant="subtitle1" gutterBottom>Mobile: {post.contact}</Typography>
            <Typography className={classes.title} variant="subtitle1" gutterBottom>Experience: {post.experience}</Typography>
            <Typography className={classes.title} variant="subtitle1" gutterBottom>Govt. ID: {post.aadhaar}</Typography>
            <CardContent>
                <Typography gutterBottom>{post.description}</Typography>
            </CardContent>
            <CardActions variant="body1" className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;
