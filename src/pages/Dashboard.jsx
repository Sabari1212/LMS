import React from 'react'
import { FaBookOpenReader } from 'react-icons/fa6'
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  return (
    <div>
     

      <div className='flex gap-3 items-center mt-6 ml-5 lg:ml-20'>
        <div>
          <CgProfile size={40}/>

        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='font-bold text-xl'>Welcome back, Yuvaraj</h1>
          <button className='text-violet-800 border-b border-b-violet-800'>Add occupation and Interests</button>

        </div>
      </div>

    </div>
  )
}

export default Dashboard