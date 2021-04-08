import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const fetchPost = () => API.get("posts");
export const createPost = (newPost) => API.post("posts", newPost);
export const updatePost = (currentId, updatedPost) =>
  API.patch(`posts/${currentId}`, updatedPost);
export const deletePost = (currentId) => API.delete(`posts/${currentId}`);
export const updateLikePost = (currentId) =>
  API.patch(`posts/${currentId}/likePost`);

export const signIn = (formData) => API.post("users/signIn", formData);
export const signUp = (formData) => API.post("users/signUp", formData);
