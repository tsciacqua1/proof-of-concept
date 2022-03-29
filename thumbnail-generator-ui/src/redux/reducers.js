const initialState = {
  user: {},
  urls: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    }

    case "UPLOAD_IMAGE": {
      return {
        ...state,
        urls: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
