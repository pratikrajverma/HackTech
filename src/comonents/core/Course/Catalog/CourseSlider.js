import React from 'react'
import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"

import locatemeLogo from '../../../../assets/Logo/location.png'
import { IoSearch } from "react-icons/io5";

import toast from 'react-hot-toast'

// import "swiper/css/pagination"


import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {


  const [animate, setAnimate] = useState(false);

  useEffect(() => {

    const interval = setInterval(() => {
      setAnimate(!animate);
      setTimeout(() => {
        setAnimate(false);
      }, 1000); // Duration of scaleIn animation
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  },[]);

  const [pincode, setPincode] = useState('')
  const [filterCourses, setFilterCourses] = useState([])

  const enterPincode = (e) => {
    setPincode(e.target.value)

  }


  const pincodeHandler = (Courses) => {

    const filterCourses = Courses.filter((course) => course.pincode === pincode);

    if(filterCourses.length === 0){
      toast.error('No courses found at this pincode...')

    }

    setFilterCourses(filterCourses)
   
  }

  console.log("Courses in card slider :", Courses)

  return (
    <div className=' flex flex-col gap-16 w-[1210PX]'>

      {/* search bar */}
      <div className=' flex justify-center mb-40 mt-10  items-center gap-3'>

        <div className='flex justify-end'><img src={locatemeLogo} className={`  h-16 cursor-pointer active:scale-95 ${animate ? 'animate-ping' : 'animate-none'} `}></img> </div>

        <input className='h-12 w-80 rounded-lg bg-richblack-700 placeholder:text-xl  m-5 p-4 text-white font-semibold  '
          placeholder='Enter your pin code...' type='text'
          onChange={enterPincode}
        />
        <IoSearch className='text-white text-3xl cursor-pointer
         hover:text-caribbeangreen-300 active:scale-90  '
          onClick={() => pincodeHandler(Courses)} />

      </div>


      {
        filterCourses.length > 0 ? (
          filterCourses.map((course, index) => (
            <Course_Card key={index} {...course} />
          )) 
        ) : ( 

          Courses.length > 0 ? (

            Courses.map((course, index) => (

              <Course_Card key={index} {...course} />
            ))


          ) : (
            <p className="text-xl text-richblack-5">No Course Found...</p>
          )

        )


      }
    </div>
  )
}

export default CourseSlider
