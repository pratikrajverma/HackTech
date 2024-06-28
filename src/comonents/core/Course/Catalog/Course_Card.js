

import CTAButton from '../../Homepage/Button'

const Course_Card = (course) => {
  console.log("course ka data in course_card", course)


  const startVideo = (link) => {
    try {
      console.log('video start', link)
      window.location.href = link;
    } catch (error) {
      console.error('Error opening video:', error);
    }
  }






  return (
    <div>

      <div className=' hidden md:flex justify-between items-center w-[1200px] border-[4px] rounded-md border-richblack-300 ml-6   '>

        {/* this is for profile image */}
        <div className='bg-cover   bg-center h-[13rem] w-[15rem]  border-2
                 border-pure-greys-200'  style={{ backgroundImage: `url(${course.thumbnail}) ` }} >
        </div>



        <div className='flex flex-col   h-[12rem]  w-[30%] text-white gap-2 pb-5' >
          <h1 className='text-pure-greys-5 pt-2 text-2xl font-bold '>{`${course.instructor.firstname}  ${course.instructor.lastname}`}</h1>

          <p className="text-yellow-300">{course.instructor.additionDetails.about}</p>

          <p className="text-yellow-300">Mob : {course.instructor.additionDetails.contactNumber}</p>

          <p className="text-yellow-300">Email : {course.instructor.email}</p>


          <div className="  relative bottom-2 ">
            <div className='bg-blue-300   blur-lg h-3'></div>

            <div className='flex gap-10  '>
              <CTAButton active={"bg-yellow-100"} linkto={"login"}>View Profile</CTAButton>

              <button className='text-white  bg-caribbeangreen-400 py-2 px-5  first-letter: 
               rounded-md active:scale-95 hover:bg-caribbeangreen-100 top-1 '
                onClick={() => startVideo(course.lectureVideo)}

              >Start Video</button>
            </div>
          </div>

        </div>

        <div className='w-[40%] overflow-auto  text-white flex flex-col gap-2 bg-richblue-800 p-5 rounded-md'>
          <p className='font-semibold text-xl text-blue-100'> {course.courseName}</p>

          <p><span className='text-blue-25'>Video Description : </span> {course.courseDescription}</p>

          {/* <p><span className='text-blue-25'>What You will learn: </span> {course.whatYouWillLearn}</p> */}

          <p className='font-semibold'><span className='text-blue-25'>Address : </span><span className='text-caribbeangreen-100'> </span></p>

        </div>




      </div>





      {/*................................ responsive design................................*/}

      <div className='md:hidden w-screen '>
        <div className='border-2 border-pure-greys-200 w-[95%] h-fit rounded-lg hover:bg-richblack-800 transition-all duration-200 '
            onClick={()=>startVideo(course.lectureVideo)}>
          <div className='w-[100%]  h-52'>
              <img
                className='w-[100%] h-[100%]'
                src={course.thumbnail}
              />
          </div>

          <div className='mt-2'>
              {/* profile photo */}
              <div className='flex items-center gap-2 '>
                <img
                  className='h-16 rounded-2xl ml-2 aspect-square'
                  src={course.instructor.image}
                />

                <div>
                  <p className='text-white  text-3xl'>{course.instructor.firstname} {course.instructor.lastname}</p>
                </div>
              </div>

              <div className='felx flex-col gap-y-2 my-4'>
                <p className='text-blue-200 text-3xl font-semibold pb-2 pl-2'>{course.courseName}</p>
                
                <p className='text-white pl-2'>Description: {course.courseDescription}</p>
                <div className='text-white flex pl-2 '><p>Mob No : </p> <span>{course.instructor.additionDetails.contactNumber}</span></div>
                <div className='text-white flex pl-2'><p>Email Id: </p> <span>{course.instructor.email}</span></div>
                <div className='text-white flex pl-2'><p>Address : <span>{course.instructor.additionDetails.about}</span></p></div>
              </div>


          </div>
        </div>
      </div>

    </div>
  )
}

export default Course_Card


