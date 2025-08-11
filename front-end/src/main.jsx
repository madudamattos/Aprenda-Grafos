import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './Main.css'
import App from './App.jsx'

console.log('main.jsx loading...'); // Debug log

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

console.log('main.jsx loaded'); // Debug log

