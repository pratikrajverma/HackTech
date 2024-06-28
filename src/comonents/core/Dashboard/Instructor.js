import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
 

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  // const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    (async () => {
      // setLoading(true)
      // const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      // console.log(instructorApiData)
      // if (instructorApiData.length) setInstructorData(instructorApiData)
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
            
            <div className="my-4 flex lg:flex-row items-center flex-col gap-10 lg:items-start space-x-6">
              {courses.map((course) => (
                <div key={course._id} className="lg:w-1/3  border border-richblack-400 rounded-md p-4 w-52"
                    onClick={()=>startVideo(course.lectureVideo)}>
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className=" w-full h-[200px]  rounded-md object-cover"
                  />
                  <div className="mt-3 ">
                    <p className="text-xl font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
      
    </div>
  )
}
