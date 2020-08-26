import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="chatbot-container">
        <Chatbot name="Test" />
      </div>
    </div>
  );
}

export default App;
