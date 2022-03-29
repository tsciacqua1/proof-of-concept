import axios from "axios";

export const uploadImage = (data) => async (dispatch) => {
  try {
    const auth = localStorage.getItem("user");
    const token = JSON.parse(auth)?.token;

    if (token) {
      const response = await axios.post("/upload", data, {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch({
        type: "UPLOAD_IMAGE",
        payload: response.data.images,
      });
    } else {
      throw new Error("You are not logged in");
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const register = (data) => async () => {
  try {
    const response = await axios.post("/register", data);
    if (response) {
      localStorage.removeItem("user");
    }
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/login", data);
    if (response) {
      dispatch({
        type: "LOGIN",
        payload: response.data,
      });
    }

    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export const logout = () => async () => {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.error(error.message);
  }
};
