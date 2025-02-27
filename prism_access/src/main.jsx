/* ==========================================================================

File: src/main.jsx

Description:
This file is the main entry point for the application. It renders the App component to the DOM.

Features:
- Renders the App component to the DOM.

Instructions:
- This file should not be deleted.

========================================================================== */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
