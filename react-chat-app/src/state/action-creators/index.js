export const setConnectedClients = (clients) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CONNECTED_CLIENTS',
            payload: clients
        })
    }  
}

export const setMessages = (clientId, decryptedMessage) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_MESSAGES',
            payload: [{ clientId, message: decryptedMessage }],
        });
    };
};

export const removeMessagesForClient = (message) => {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_MESSAGES_FOR_CLIENT',
            payload: message,
        });
    };
};


export const setChatboxDimensions = (dimensions) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CHATBOX_DIMENSIONS',
            payload: dimensions,
        })
    }  
}

export const setConnected = (isConnected) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CONNECTED',
            payload: isConnected,
        })
    } 
}


export const setAuthentication = (isAuthenticated) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_AUTHENTICATION',
            payload: isAuthenticated,
        })
    } 
}
    
  
  


  


  