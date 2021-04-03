import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

// We must get id post to update that

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    tags: "",
    selectedFile: "",
    message: "",
  });

  //fetching data with redux:
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clearForm();
  };

  const handleChange = (type) => (e) => {
    switch (type) {
      case "Creator":
        setPostData({ ...postData, creator: e.target.value }); // it's provide all content of data, so if we have a lot of textfield, it can be fully with it and not replace with the new data.
        break;
      case "Title":
        setPostData({ ...postData, title: e.target.value });
        break;
      case "Message":
        setPostData({ ...postData, message: e.target.value });
        break;
      case "Tags":
        setPostData({ ...postData, tags: e.target.value.split(',') });
        break;
      default:
        break;
    }
  };

  const clearForm = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      tags: "",
      selectedFile: "",
      message: "",
    });
  };

  useEffect(() => {
    console.log(post);
    if (post) setPostData(post);
  }, [post]);

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" style={{ marginBottom: "1rem" }}>
          {!post ? "Create a" : `Update '${post.title}'`} Memory
        </Typography>
        <TextField
          style={{ marginBottom: "1rem" }}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleChange("Creator")}
        ></TextField>
        <TextField
          style={{ marginBottom: "1rem" }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange("Title")}
        ></TextField>
        <TextField
          style={{ marginBottom: "1rem" }}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleChange("Message")}
        ></TextField>
        <TextField
          style={{ marginBottom: "1rem" }}
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={handleChange("Tags")}
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearForm}
          fullWidth
        >
          Clear form
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
