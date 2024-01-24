import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
