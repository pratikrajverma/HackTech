import React from 'react'
import courses from '../../../assets/Images/courses.jpeg'
import { useNavigate } from 'react-router-dom'


const Course = () => {
   const navigate = useNavigate();

   function courseshandler()
   {
       navigate('/catalog/web-developement');
   }


  return (
    <div className='w-[300px] h-[25rem] hover:outline-dashed outline-caribbeangreen-50   course rounded-lg overflow-hidden bg-opacity-80 bg-richblue-700 max-h-max p-1 '> 
       <div className='p-3'>
           <img src={courses } className='w-[280px] '></img>
       </div>

       <div className='text-white mt-3 font-semibold text-3xl  p-4 leading-6'>
           <h1>Recorded Lecture</h1>
       </div>

       <div className='text-center'>
           <button className='py-2 font-bold text-pure-greys-50  w-40 my-[3.7rem] rounded-md active:scale-95  bg-blue-300 hover:scale-95 hover:bg-caribbeangreen-500'
                   onClick={courseshandler}
                   >
               Start
           </button>
       </div>
       
       
    </div>
  )
}

export default Course