const connectedReducer = (state = false, action) => {
    if (action.type === 'SET_CONNECTED') {
        return action.payload;
    } else {
        return state;
    }
};

export default connectedReducer;
