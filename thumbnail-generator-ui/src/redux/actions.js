import axios from "axios";

export const uploadImage = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/upload", data);
    dispatch({
      type: "UPLOAD_IMAGE",
      payload: response.data.images,
    });
  } catch (error) {
    console.error(error.message);
  }
};
