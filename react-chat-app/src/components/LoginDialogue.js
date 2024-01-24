import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.isAuthenticated || false);

    const dispatch = useDispatch();
    const { setAuthentication } = bindActionCreators(actionCreators, dispatch);


    useEffect(() => {
        fetch('/api/login')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => setUsers(data));
    }, []);

    const handleLogin = () => {
        // Check if there is a user with the entered username and password
        const matchingUser = users.find(
            (user) => user.username === username && user.password === password
        );

        // Log success or fail based on the result
        if (matchingUser) {
            // Redirect to the ChatPage
            setAuthentication(true);
            navigate('/chat');
            console.log('Login success');
        } else {
            console.log('Login fail');
            alert("Username or password incorrect")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-4xl mb-4">Login</h1>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
