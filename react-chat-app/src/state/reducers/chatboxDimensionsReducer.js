const chatboxDimensionsReducer = (state = { width: 'w-96', height: 'h-55' }, action) => {
    if (action.type === 'SET_CHATBOX_DIMENSIONS') {
        return {
          ...state,
          ...action.payload,
        };
      } else {
        return state;
      }
};

export default chatboxDimensionsReducer;
