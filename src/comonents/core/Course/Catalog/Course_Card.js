



const Course_Card = (course) => {
  console.log("course ka data in course_card", course)

  
  const startVideo = (link) => {
    try {
      console.log('video start', link)
        window.open(link );
    } catch (error) {
        console.error('Error opening video:', error);
    }
}

  


  return (
    <div className=''>
    


      <div className=' flex justify-between items-center w-[1200px] border-[4px] rounded-md border-richblack-300 ml-6  pr-5'>

        <div className='bg-cover   bg-center h-[13rem] w-[15rem]  border-2
                         border-pure-greys-200'  style={{ backgroundImage: `url(${course.thumbnail}) `  }} > </div>



        <div className='flex flex-col   h-[12rem]  w-[25%] text-white gap-2' >
          <h1 className='text-pure-greys-5 pt-2 text-2xl font-bold '>{`${course.instructor.firstname}  ${course.instructor.lastname}`}</h1>

          <p className="text-yellow-300">{course.instructor.additionDetails.about}</p>

          <p className="text-yellow-300">Mob : {course.instructor.additionDetails.contactNumber}</p>

          <p className="text-yellow-300">Email : {course.instructor.email}</p>

          <div className='bg-blue-300 blur-lg h-3'></div>

        </div>

        <div className='w-[40%] overflow-auto  text-white flex flex-col gap-2 bg-richblue-800 p-5 rounded-md'>
          <p className='font-semibold text-xl text-blue-100'> {course.courseName}</p>

          <p><span className='text-blue-25'>courseDescription : </span> {course.courseDescription}</p>
         
          <p><span className='text-blue-25'>What You will learn: </span> {course.whatYouWillLearn}</p>

          <p className='font-semibold'><span className='text-blue-25'>Price : </span><span className='text-caribbeangreen-100'>₹ {course.price}</span></p>

        </div>



        <button className='text-white bg-caribbeangreen-400 py-2 px-5 my-[3.7rem]  
                       rounded-md active:scale-95 hover:bg-caribbeangreen-100 '
                       onClick={() => startVideo(course.courseContent[0].Subsection[0].videoUrl)}

                       >Start learning</button>
      </div>


    </div>
  )
}

export default Course_Card

 
