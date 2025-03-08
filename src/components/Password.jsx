import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Password = () => {
  const [otp,setOtp]=useState(false)
  const navigate=useNavigate()

  function handleSubmit(){
    navigate("/changepw")

  }
  return (
    <div className='flex flex-col gap-5 justify-center h-screen items-center'>
    <div className='flex flex-col lg:w-1/3 p-5 border-3 border-gray-300 rounded-md gap-4 mx-5 md:mx-0'>
      <h1 className='font-bold text-2xl'>Forget Password</h1>
      <h1 className='text-center lg:text-left'>Enter your Email here.After that ,you'll get OTP and submit it.</h1>
      <label className='font-bold'>Email</label>
      
      <input type='email' placeholder='Enter your email' className='border-gray-300 border-1 h-[30px] p-2 rounded-md'></input>
      <button className='bg-blue-800 p-1 w-max rounded-md text-white ml-auto' onClick={()=>setOtp(true)}>Send OTP</button>
    {otp &&
    <div className='flex flex-col gap-3  '>
      <label className='font-bold'>Enter OTP</label>
      <input type='text' placeholder='Enter your Otp' className='border-gray-300 border-1 h-[30px] p-2 rounded-md'></input>
      <button className='bg-blue-800 p-2 w-max rounded-md text-white ml-auto' onClick={handleSubmit}>Submit</button>
      </div>
    }
    </div>
    </div>
  )
}

export default Password