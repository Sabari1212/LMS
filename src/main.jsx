import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Password from './components/Password.jsx'
// npm create vite@latest
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Password/>
  </StrictMode>,
)
