import React, { useEffect, useState } from 'react'
import { FaBookOpenReader } from 'react-icons/fa6'
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Getuser1,Getuser2 } from '../SpringCourse';
import { Getlocalstorage } from '../localStroage';
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
  var [AllUserData, setAllUserData] = useState("");
  var [AllUserData2, setAllUserData2] = useState("");
  useEffect(() => {
    GetUserdata()
  }, [])
  async function GetUserdata() {
    try {
      const Tocken = Getlocalstorage()
      const response = await Getuser1(Tocken)
      const response2 = await Getuser2(Tocken)
      setAllUserData(response.data)
      setAllUserData2(response2.data)
      console.log(response.data)

    } catch (error) {
      navigate("/")
      console.error("Error accessing protected route:", error.data);
    }
  }
  return (
    <div>


      <div className='flex gap-3 items-center mt-6 ml-5 lg:ml-20'>
        <div>
          <CgProfile size={40} />

        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='font-bold text-xl'>Welcome back, Yuvaraj</h1>
          <h1 className='font-bold text-xl'>{AllUserData}</h1>
          <h1 className='font-bold text-xl'>{AllUserData2}</h1>
          <button className='text-violet-800 border-b border-b-violet-800'>Add occupation and Interests</button>

        </div>
      </div>

    </div>
  )
}

export default Dashboard