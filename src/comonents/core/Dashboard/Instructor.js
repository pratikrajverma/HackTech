import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"

import { deleteCourse, fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import {RiDeleteBin6Line} from 'react-icons/ri'
 

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
 
  const [courses, setCourses] = useState([])

  useEffect(() => {
    (async () => {
 
      const result = await fetchInstructorCourses(token)
 
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

 

  const startVideo = (link) =>{
    // TODO: Implement video playback logic here
    try {
      console.log('video start', link)
      window.location.href = link;
    } catch (error) {
      console.error('Error opening video:', error);
    }
    
  }


  const courseDeleteHandler = async (courseId) => {
      await deleteCourse({courseId : courseId}, token)
  }

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-5">
          Hi {user?.firstname} 👋 
        </h1> 
        <p className="font-medium text-richblack-200">
          Let's start something new
        </p>
      </div>

     
          

          <div className="rounded-md bg-richblack-800 p-6">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
             
            </div>

              {/* .........course card........ */}
            <div className="my-4 flex lg:flex-row items-center flex-col gap-10 lg:items-start space-x-6">
              {courses.map((course) => (
                <div key={course._id} className="lg:w-1/3  border border-richblack-400 rounded-md p-4 w-52"
                    >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className=" w-full h-[200px]  rounded-md object-cover active:scale-95"
                    onClick={()=>startVideo(course.lectureVideo)}
                  />
                  <div className="mt-3 flex justify-between items-center ">
                    <p className="text-xl font-medium text-richblack-50">
                      {course.courseName}
                    </p>

                    <div className="text-pink-300 cursor-pointer"
                          onClick={()=>courseDeleteHandler(course._id)}
                          >
                      <RiDeleteBin6Line />
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
      
    </div>
  )
}
