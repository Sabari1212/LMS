import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import HomeLayout from './layout/HomeLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Password from './components/Password'
import ChangePassword from './components/ChangePassword'
import { PostAllcou } from './Admin/PostAlldata'
import Dashboard from './pages/Dashboard'
import CourseBuy from './pages/CourseBuy'
import UserLayout from './layout/UserLayout'

const App = () => {
  return (
    <div>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
          <Route path='/login' element={<HomeLayout><Login /></HomeLayout>} />
          <Route path ='/forgetpw' element={<HomeLayout><Password/></HomeLayout>}></Route>
          <Route path ='/changepw' element={<HomeLayout><ChangePassword/></HomeLayout>}></Route>
          <Route path ='/adminpostdata' element={<HomeLayout><PostAllcou/></HomeLayout>}></Route>
          <Route path ='/dashboard' element={<UserLayout><Dashboard/></UserLayout>}></Route>
          <Route path ='/courseBuy' element={<UserLayout><CourseBuy/></UserLayout>}></Route>

        </Routes>
      </BrowserRouter>

    </div>

  )
}

export default App
