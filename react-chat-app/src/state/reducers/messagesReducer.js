const messagesReducer = (state = [], action) => {
    if (action.type === 'SET_MESSAGES') {
        return [...state, ...action.payload];
    }
    else if (action.type === 'REMOVE_MESSAGES_FOR_CLIENT') {
        return action.payload;
    }
    else {
        return state;
    }
};

export default messagesReducer;

