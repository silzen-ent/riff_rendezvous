// This file is the entry point of the React app. It renders the app into the DOM.
// index.js will import the necessary libraries & components, and render the App component into the DOM.
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)