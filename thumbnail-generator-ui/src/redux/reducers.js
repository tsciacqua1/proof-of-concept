const initialState = {
  urls: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
