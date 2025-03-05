import React, { useState } from 'react'

const Login = () => {
    const [signup,setSignup]=useState(true)
  return (
    <div className='flex flex-col gap-5 justify-center h-[90vh] items-center   '>
        <div className='w-1/3 '>
            <ul className='flex  bg-gray-200 justify-around p-2 rounded-md'>
            {signup ?
                <li><button onClick={()=>setSignup(true)} className=' bg-white px-22 rounded-md py-1'>Signup</button></li>:
                <li><button onClick={()=>setSignup(true)} className=' px-20 py-1'>Signup</button></li>
            }
             {signup ?
                <li><button onClick={()=>setSignup(false)} className=' px-20 py-1'>Login</button></li>:
                <li><button onClick={()=>setSignup(false)} className='  bg-white px-22 rounded-md  py-1'>Login</button></li>
            }


                
            </ul>

        </div>
        {signup ?
        <div className='flex flex-col w-1/3 p-5 border-1 border-gray-300 rounded-md gap-4 '>
            <h1 className='font-bold'>Signup</h1>
            <h1>Create a new account and click signup when you're done.</h1>
            <label className='font-bold'>Name</label>
            <input type='text' placeholder='Enter your name'></input>
            <label className='font-bold'>Email</label>
            <input type='email' placeholder='Enter your email'></input>
            <label className='font-bold'>Password</label>
            <input type='password' placeholder='Enter your password'></input>
            <button className='bg-gray-800 p-2 w-max rounded-md text-white '>Login</button>

        </div>
        :
        <div className='flex flex-col w-1/3 p-5 border-1 border-gray-300 rounded-md gap-7 '>
        <h1 className='font-bold'>Login</h1>
        <h1>Login your password here.After signup ,you'll be logged in.</h1>
        <label className='font-bold'>Email</label>
        <input type='email' placeholder='Enter your email'></input>
        <label className='font-bold'>Password</label>
        <input type='password' placeholder='Enter your password'></input>
        <button className='bg-gray-800 p-2 w-max rounded-md text-white '>Login</button>

    </div>
}


    </div>
  )
}

export default Login