import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsers } from '../slice/userSlice'

const Login = () => {
    const dispatch=useDispatch()
    const [signup,setSignup]=useState(true)

    const [signupForm,setSignupForm]=useState({
        email:"",
        name:"",
        pw:""
    })

    function handleSignupForm(e){
        setSignupForm({...signupForm,[e.target.name]:e.target.value})

    }
    function handleSignup(){
       
        dispatch(setUsers(signupForm))
        setSignupForm({
            name:"",
            email:"",
            pw:""

            
        }
        )

    }
  return (
    <div className='flex flex-col gap-5 justify-center h-screen items-center   '>
        <div className=' lg:w-1/3 mx-5 md:mx-0 '>
            <ul className='flex  bg-gray-200 justify-around p-2 rounded-md'>
            {signup ?
                <li><button onClick={()=>setSignup(true)} className=' bg-white px-18 rounded-md py-1'>Signup</button></li>:
                <li><button onClick={()=>setSignup(true)} className=' px-18 py-1'>Signup</button></li>
            }
             {signup ?
                <li><button onClick={()=>setSignup(false)} className=' px-18 py-1'>Login</button></li>:
                <li><button onClick={()=>setSignup(false)} className='  bg-white px-18 rounded-md  py-1'>Login</button></li>
            }


                
            </ul>

        </div>
        {signup ?
        <div className='flex flex-col lg:w-1/3 p-5 border-1 border-gray-300 rounded-md gap-4 mx-5 md:mx-0 '>
            <h1 className='font-bold'>Signup</h1>
            <h1 className='text-center lg:text-left'>Create a new account and click signup when you're done.</h1>
            <label className='font-bold'>Name</label>
            <input type='text' placeholder='Enter your name' className='border-gray-300 border-1 h-[30px] p-2 rounded-md' name='name' value={signupForm.name} onChange={handleSignupForm}></input>
            <label className='font-bold'>Email</label>
            <input type='email' placeholder='Enter your email' className='border-gray-300 border-1 h-[30px] p-2 rounded-md' name='email' value={signupForm.email} onChange={handleSignupForm}></input>
            <label className='font-bold'>Password</label>
            <input type='password' placeholder='Enter your password' className='border-gray-300 border-1 h-[30px] p-2 rounded-md' name='pw' value={signupForm.pw} onChange={handleSignupForm}></input>
            <button className='bg-gray-800 p-2 w-max rounded-md text-white ' onClick={handleSignup}>Login</button>

        </div>
        :
        <div className='flex flex-col lg:w-1/3 p-5 border-1 border-gray-300 rounded-md gap-7 mx-5 md:mx-0 '>
        <h1 className='font-bold'>Login</h1>
        <h1 className='text-center lg:text-left'>Login your password here.After signup ,you'll be logged in.</h1>
        <label className='font-bold'>Email</label>
        <input type='email' placeholder='Enter your email'  className='border-gray-300 border-1 h-[30px] p-2 rounded-md'></input>
        <label className='font-bold'>Password</label>
        <input type='password' placeholder='Enter your password'  className='border-gray-300 border-1 h-[30px] p-2 rounded-md'></input>
        <button className='bg-gray-800 p-2 w-max rounded-md text-white '>Login</button>

    </div>
}


    </div>
  )
}

export default Login