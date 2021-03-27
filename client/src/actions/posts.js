import * as api from "../api";

// Action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fethcPost();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log("getPosts Error: ", error.message);
  }
};
