import React from 'react'

const Password = () => {
  return (
    <div className='flex flex-col gap-5 justify-center h-screen items-center'>
    <div className='flex flex-col lg:w-1/3 p-5 border-3 border-gray-300 rounded-md gap-7 mx-5 md:mx-0'>
      <h1 className='font-bold'>Forget Password</h1>
      <h1 className='text-center lg:text-left'>Enter your Email here.After that ,you'll get OTP and submit it.</h1>
      <label className='font-bold'>Email</label>
      <input type='email' placeholder='Enter your email' className='border-gray-300 border-1 h-[30px] p-2 rounded-md'></input>
      <label className='font-bold'>Enter OTP</label>
      <input type='password' placeholder='Enter your password' className='border-gray-300 border-1 h-[30px] p-2 rounded-md'></input>
      <button className='bg-gray-800 p-2 w-max rounded-md text-white'>Submit</button>
    </div>
    </div>
  )
}

export default Password