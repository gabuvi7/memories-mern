import * as api from "../api";

// Action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPost();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log("getPosts Error: ", error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log("createPost Error: ", error.message);
  }
};

export const updatePost = (currentId, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(currentId, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log("updatePost Error: ", error);
  }
};

export const deletePost = (currentId) => async (dispatch) => {
  try {
    await api.deletePost(currentId);
    dispatch({ type: "DELETE", payload: currentId });
  } catch (error) {
    console.log("deletePost Error: ", error);
  }
};

export const updateLikePost = (currentId) => async (dispatch) => {
  try {
    const { data } = await api.updateLikePost(currentId);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log("likePost Error: ", error);
  }
};
