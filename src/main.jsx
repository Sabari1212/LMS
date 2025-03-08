import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Password from './components/Password.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
// npm create vite@latest
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />


    </Provider>
  
    
  </StrictMode>,
)
