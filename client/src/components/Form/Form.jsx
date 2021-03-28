import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useState } from "react";

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostData(e.target.value);
  };

  const handleChange = (e, type) => {
    setPostData({ ...postData, type: e.target.value }); // it's provide all content of data, so if we have a lot of textfield, it can be fully with it and not replace with the new data.
  };

  return (
    <Paper className={classes.paper}>
      <form
        autocomplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.Creator} onChange={handleChange}></TextField>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={handleChange}></TextField>
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={handleChange}></TextField>
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={handleChange}></TextField>
      </form>
    </Paper>
  );
};

export default Form;
