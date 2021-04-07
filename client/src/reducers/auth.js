import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (action, state = { authData: null }) => {
  switch (action?.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { authData: action?.data, ...state };
    case LOGOUT:
      localStorage.clear();
      return { authData: null, ...state };
    default:
      return state;
  }
};

export default authReducer;
