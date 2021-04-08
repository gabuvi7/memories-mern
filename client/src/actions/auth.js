import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);
    dispatch({ data, type: AUTH });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ data, type: AUTH });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
