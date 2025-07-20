import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+
import App from './App';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(<App />); // Render the App component
