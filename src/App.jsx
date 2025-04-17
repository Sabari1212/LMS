import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import HomeLayout from './layout/HomeLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Password from './components/Password'
import ChangePassword from './components/ChangePassword'
import UserLayout from './layout/UserLayout'
import Dashboard from './pages/Dashboard'
import CourseBuy from './pages/CourseBuy'
import { PostAllcou } from './Admin/PostAlldata'
import CourseVideo from './pages/CourseVideo'
import ExCourseVideo from './pages/ExCourseVideo'
import Peymentpage from './pages/peymentpage'
import CourseCreator from './pages/CourseCreator'
// import ExCourseVideo from './pages/ExCourseVideo'

const App = () => {
  return (
    <div>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
          <Route path='/login' element={<HomeLayout><Login /></HomeLayout>} />
          <Route path ='/forgetpw' element={<HomeLayout><Password/></HomeLayout>}></Route>
          <Route path ='/changepw' element={<HomeLayout><ChangePassword/></HomeLayout>}></Route>
          <Route path ='/userdashboard' element={<UserLayout><Dashboard/></UserLayout>}></Route>
          <Route path ='/coursebuy' element={<UserLayout><CourseBuy/></UserLayout>}></Route>
          <Route path ='/admin' element={<UserLayout><PostAllcou/></UserLayout>}></Route>
<<<<<<< HEAD
          <Route path ='/course' element={<UserLayout><CourseVideo/></UserLayout>}></Route>
=======
          <Route path ='/course' element={<UserLayout><ExCourseVideo/></UserLayout>}></Route>
          <Route path ='/peymentpage' element={<UserLayout><Peymentpage/></UserLayout>}></Route>
          <Route path ='/admin2' element={<UserLayout><CourseCreator/></UserLayout>}></Route>
>>>>>>> 6f34a5aecf79babe14ee5b528b7e9439de4d08eb

        </Routes>
      </BrowserRouter>

    </div>

  )
}

export default App
