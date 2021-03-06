import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { ThumbUpAlt, Delete, MoreHoriz } from "@material-ui/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, updateLikePost } from "../../../actions/posts";
import { useEffect, useState } from "react";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [like, updateLike] = useState(post.likeCount);

  const handleLikeClick = () => {
    updateLike(post.likeCount + 1);
    dispatch(updateLikePost(post._id));
  };

  const handleEditClick = () => {
    setCurrentId(post._id);
  };

  const handleDeleteClick = () => {
    dispatch(deletePost(post._id));
  };

  useEffect(() => {
    post.likeCount = like;
  }, [like, post]);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={handleEditClick}
        >
          <MoreHoriz fontSize="default"></MoreHoriz>
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h6" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleLikeClick}>
          <ThumbUpAlt fontSize="small" />
          &nbsp; Like &nbsp; {like}
        </Button>
        <Button size="small" color="primary" onClick={handleDeleteClick}>
          <Delete fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
export default Post;
