 const authReducer = (state = false, action) => {

    if (action.type === 'SET_AUTHENTICATION') {
        return {
            ...state,
            isAuthenticated: action.payload,
          };
    } else {
        return state;
    }
  };
  
  export default authReducer;
  