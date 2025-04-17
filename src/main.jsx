import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Password from './components/Password.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Dashboard from './pages/Dashboard.jsx'
import CourseBuy from './pages/CourseBuy.jsx'
import LearningPathway from './components/LearningPathway.jsx'
import CourseCreator from './pages/CourseCreator.jsx'
<<<<<<< HEAD
import ExCourseVideo from './pages/ExCourseVideo.jsx'
import LearningPath from './pages/LearningPath.jsx'
import Example2 from './pages/Example2.jsx'
=======
// import ExCourseVideo from './pages/ExCourseVideo.jsx'
import Example2 from './pages/ExCourseVideo.jsx'
>>>>>>> 6f34a5aecf79babe14ee5b528b7e9439de4d08eb
// npm create vite@latest
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
     {/* <App /> */}
     <CourseCreator/>
     {/* <ExCourseVideo/> */}
      {/* <LearningPath/> */}
      {/* <Example2/> */}
      
=======
     <App />
    
     {/* <Example2/> */}
>>>>>>> 6f34a5aecf79babe14ee5b528b7e9439de4d08eb
    
    </Provider>
  
  </StrictMode>
)
