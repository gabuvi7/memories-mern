import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  try {
    const updatePost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );
    res.status(204).json(updatePost);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  try {
    await PostMessage.findByIdAndRemove(_id);
    res.status(204).json("Post deleted successfully");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const updateLikePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(401).json({ message: "Unauthorized." });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json("No post with that id");
  try {
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const likedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    return res.status(204).json(likedPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
