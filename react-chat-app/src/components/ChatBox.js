import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import io from 'socket.io-client';
import CryptoJS from 'crypto-js';


const socket = io('http://127.0.0.1:5000/'); // Replace with your backend URL

// Encryption function
const encrypt = (message, key) => {
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return encrypted;
};

// Decryption function
const decrypt = (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
};


const ChatBox = () => {
  
    const [input, setInput] = useState('');


    const messages = useSelector((state) => state.messages || []);
    const chatboxDimensions = useSelector((state) => state.chatboxDimensions || { width: 'w-96', height: 'h-55' });
    const connected = useSelector((state) => state.connected || false);
    const connectedClients = useSelector((state) => state.connectedClients || []);

    const dispatch = useDispatch();
    const { setConnectedClients, setMessages, removeMessagesForClient, setChatboxDimensions, setConnected } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        const handleReceivedMessage = (data) => {
            const { clientId, message } = data;
            const decryptedMessage = decrypt(message, 'Sixteen byte key');
            console.log(`Received decrypted message from Client ${clientId}: ${decryptedMessage}`);
            setMessages(clientId, decryptedMessage);

        };

        const handleConnectedClients = (clients) => {
            setConnectedClients(clients);
        };

        socket.on('message', handleReceivedMessage);
        socket.on('connected_clients', handleConnectedClients);

        return () => {
            socket.off('message', handleReceivedMessage);
            socket.off('connected_clients', handleConnectedClients);
            socket.disconnect();
        };
    }, []);



    const sendMessage = () => {
        if (input.trim() !== '') {
            const clientId = socket.id;
            const encryptedMessage = encrypt(input, 'Sixteen byte key');
            socket.emit('message', { clientId, message: encryptedMessage });
            setInput('');
        }
    };

    const handleConnect = () => {
        if (!connected) {
            socket.connect();
            setConnected(true);
            setChatboxDimensions({ width: 'w-116', height: 'h-106' });
            console.log(`Connected with Client ID: ${socket.id}`);
        } else {
            socket.disconnect();
            setConnected(false);
            setChatboxDimensions({ width: 'w-96', height: 'h-55' });
            console.log(`Disconnected from Client ID: ${socket.id}`);
            removeMessagesForClient([]);
        }
    };



    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className={`bg-white p-8 rounded-lg shadow-md ${chatboxDimensions.width} ${chatboxDimensions.height}`}>
                    <h1 className="text-4xl mb-4">Chat with Friends!</h1>
                    <div className="flex flex-col h-60 overflow-y-auto border border-gray-300 p-4 mb-4">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <span className="font-bold">{`Client ${msg.clientId}: `}</span>
                                {msg.message}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-4 mb-4">
                            <input
                                className="flex-grow border border-gray-300 p-2 rounded"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <button
                                className={`bg-blue-500 text-white px-4 py-2 rounded ${connected ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-blue-600'
                                    }`}
                                onClick={handleConnect}
                            >
                                {connected ? 'Disconnect' : 'Start Chat'}
                            </button>
                            {connected && (
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    onClick={sendMessage}
                                >
                                    Send
                                </button>
                            )}
                        </div>
                    </div>


                    {/* Display connected clients */}
                    <div className="flex flex-col items-start space-y-2">
                        {connectedClients.map((client) => (
                            <div key={client} className="flex items-center">
                                <div className={`w-4 h-4 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="ml-2">{`Client ${client}`}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox;
