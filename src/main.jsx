import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Password from './components/Password.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Dashboard from './pages/Dashboard.jsx'
import CourseBuy from './pages/CourseBuy.jsx'
import LearningPathway from './components/LearningPathway.jsx'
import CourseCreator from './pages/CourseCreator.jsx'
import ExCourseVideo from './pages/ExCourseVideo.jsx'
import LearningPath from './pages/LearningPath.jsx'
import Example2 from './pages/Example2.jsx'
// npm create vite@latest
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     {/* <App /> */}
     <CourseCreator/>
     {/* <ExCourseVideo/> */}
      {/* <LearningPath/> */}
      {/* <Example2/> */}
      
    
    </Provider>
  
  </StrictMode>,
)
