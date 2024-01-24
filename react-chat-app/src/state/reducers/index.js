import { combineReducers } from "redux";
import connectedClientsReducer from "./connectedClientsReducer";
import chatboxDimensionsReducer from "./chatboxDimensionsReducer";
import connectedReducer from "./connectedReducer"
import messagesReducer from "./messagesReducer"
import authReducer from './authReducer';


const reducers = combineReducers ({
    connectedClients: connectedClientsReducer,
    chatboxDimensions: chatboxDimensionsReducer,
    connected: connectedReducer,
    messages: messagesReducer,
    auth: authReducer
})

export default reducers;