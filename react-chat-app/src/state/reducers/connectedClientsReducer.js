const connectedClientsReducer = (state = [], action) => {
    if(action.type === 'SET_CONNECTED_CLIENTS') {
        return action.payload;
    }
    else {
        return state;
    }
  };
  
  export default connectedClientsReducer;