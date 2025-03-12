import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Password from './components/Password.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Dashboard from './pages/Dashboard.jsx'
// npm create vite@latest
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     {/* <App />  */}
     <Dashboard/>
    


    </Provider>
  
    
  </StrictMode>,
)
