import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';

// load custom CSS
//TODO: check if needed: import './styles/main.css';

// load Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// load Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));

// render main application
root.render(<App />);
