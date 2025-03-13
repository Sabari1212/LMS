import React from 'react'
import course from '../assets/course.jpg'
import { CiHeart } from "react-icons/ci";

const CourseBuy = () => {
   
  return (
    <div>
<div className='bg-gray-800 lg:flex justify-evenly p-5 lg:h-[300px] '>
    <div className='justify-center flex flex-col gap-2'>
        <h1 className='font-bold text-2xl text-white'>The Complete Python Developer </h1>
        <h1 className=' text-white'>how to become a Python Developer and get hired! Build 12+ projects .learn Web Development,
            Machine Learning +more!
        </h1>
        <h1 className='text-white'>created by <span className='text-violet-900 border-b border-b-violet-800'>tobi sabi</span></h1>
        <h1 className='text-yellow-500'>Last Updated 2/2025 </h1>

    </div>
    <div className='bg-white flex flex-col gap-2 p-3 h-max border-gray-400 border-1'>
        <img className='h-40 w-72 mx-auto border-1 border-gray-600'src={course}></img>
        <h1 className='text-xl'>3,999</h1>
        <div  className='flex gap-2 justify-center'>
            <button className='border-1 border-violet-700 px-10 p-1 text-violet-800 font-bold rounded-sm'>Add to cart</button>
            <button className='border-violet-700 p-1 px-2 text-violet-800 font-bold border-1 rounded-sm'><CiHeart/></button>
        </div>
        <button className='text-white px-18 p-1 bg-violet-600 font-bold rounded-sm w-max mx-auto '>Buy now</button>
        <div>
            <h1 className='font-bold'>This Course includes:</h1>
            <ul className='flex flex-col gap-1'>
                <li>30.5 hours on-demand video</li>
                <li>1 coding execrcise</li>
                <li>Access on mobile and tv</li>
                <li>Full lifetime access</li>
            </ul>
        </div>


    </div>

</div>
<div className='border-1 border-gray-400 lg:w-1/2 lg:m-10 lg:ml-44 p-3 '>
    <h1 className='text-2xl font-bold'>What you'll learn</h1>
    <div className='lg:flex justify-between p-5'>
    <ul className='flex flex-col gap-1 list-disc' >
        <li>1dhdjdj sjkdhdhldd dkdldbdhdj</li>
        <li>2dhdjdj sjkddhdhdldd dkdld dkddhdkdkk</li>
        <li>3dhdjdj sjkdldhddd dkdld dkddjdjkdkk</li>
        <li>4dhdjdj sjkdaaldd dkdld dkdkdkk</li>
        <li>5dhdjdj sjkdlddd dkdld dkdkdkk</li>
        <li>6dhdjdj sjkdldddd dkdld dkdkdkk</li>
        <li>dhdjdj sjkddldd dkdld dkdkdkk</li>
    </ul >
    <ul className='flex flex-col gap-1 list-disc'>
        <li>1dhdjdj sjkdhdhldd dkdldbdhdj</li>
        <li>2dhdjdj sjkddhdhdldd dkdld dkddhdkdkk</li>
        <li>3dhdjdj sjkdldhddd dkdld dkddjdjkdkk</li>
        <li>4dhdjdj sjkdaaldd dkdld dkdkdkk</li>
        <li>5dhdjdj sjkdlddd dkdld dkdkdkk</li>
        <li>6dhdjdj sjkdldddd dkdld dkdkdkk</li>
        <li>dhdjdj sjkddldd dkdld dkdkdkk</li>
    </ul>
    </div>
</div>
<div className=' lg:w-1/2 lg:m-10 lg:ml-44 p-3 '>
    <h1 className='text-2xl font-bold'>Course Content</h1>
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      
        <div className="border-b">
            <button className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center accordion">
                Introduction (4 lectures • 16min)
                <span className="icon">+</span>
            </button>
            <div className="panel hidden px-6 py-2 text-gray-600">
                <ul className="list-none space-y-2">
                    <li>Course Outline <span className="text-xs float-right">05:57</span></li>
                    <li>Join Our Online Classroom! <span className="text-xs float-right">04:01</span></li>
                    <li>Exercise: Meet Your Classmates & Instructor <span className="text-xs float-right">01:47</span></li>
                    <li>ZTM Resources <span className="text-xs float-right">04:23</span></li>
                </ul>
            </div>
        </div>

        <div class="border-b">
            <button className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center accordion">
                Python Introduction (13 lectures • 44min)
                <span className="icon">+</span>
            </button>
            <div class="panel hidden px-6 py-2 text-gray-600"></div>
        </div>

        <div class="border-b">
            <button class="w-full text-left px-4 py-3 font-semibold flex justify-between items-center accordion">
                Python Basics (44 lectures • 3hr 37min)
                <span class="icon">+</span>
            </button>
            <div class="panel hidden px-6 py-2 text-gray-600"></div>
        </div>

        <div class="border-b">
            <button class="w-full text-left px-4 py-3 font-semibold flex justify-between items-center accordion">
                Python Basics II (38 lectures • 3hr 30min)
                <span class="icon">+</span>
            </button>
            <div class="panel hidden px-6 py-2 text-gray-600"></div>
        </div>

        <div class="border-b">
            <button class="w-full text-left px-4 py-3 font-semibold flex justify-between items-center accordion">
                Developer Environment (17 lectures • 1hr 7min)
                <span class="icon">+</span>
            </button>
            <div class="panel hidden px-6 py-2 text-gray-600"></div>
        </div>

        <div class="border-b">
            <button class="w-full text-left px-4 py-3 font-semibold flex justify-between items-center accordion">
                Advanced Python: Object Oriented Programming (23 lectures • 2hr 3min)
                <span class="icon">+</span>
            </button>
            <div class="panel hidden px-6 py-2 text-gray-600"></div>
        </div>

        <div class="border-b">
            <button class="w-full text-left px-4 py-3 font-semibold flex justify-between items-center accordion">
                Advanced Python: Functional Programming (14 lectures • 1hr 10min)
                <span class="icon">+</span>
            </button>
            <div class="panel hidden px-6 py-2 text-gray-600"></div>
        </div>

        <div class="border-b">
            <button class="w-full text-left px-4 py-3 font-semibold flex justify-between items-center accordion">
                Advanced Python: Decorators (6 lectures • 31min)
                <span class="icon">+</span>
            </button>
            <div class="panel hidden px-6 py-2 text-gray-600"></div>
        </div>

        <div>
            <button class="w-full text-left px-4 py-3 font-semibold flex justify-between items-center accordion">
                Advanced Python: Error Handling (5 lectures • 29min)
                <span class="icon">+</span>
            </button>
            <div class="panel hidden px-6 py-2 text-gray-600"></div>
        </div>
    </div>
    
</div>
<h1>hello</h1>

    </div>
  )
}

export default CourseBuy