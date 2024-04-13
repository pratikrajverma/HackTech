const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImage} = require('../utils/imageUploader');

//............................................create (course information) handler function...............................................
const createCourse = async(req,res)=>{
    try{
        //fetch data
        let {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions  } = req.body;
         
        //get thumbnail  
        console.log('data he ',courseName,courseDescription, whatYouWillLearn, price, tag, category );
        const thumbnail = req.files.thumbnail;
        // const thumbnail = '../../src/assets/Images/Instructor.png';

        console.log('thumnail ',thumbnail );
           
        //validation
        if(!courseDescription || !courseName || !price || !tag ||!whatYouWillLearn ||!category   ){
            return res.status(400).json({
                success: false, 
                message: 'all fields of course are required'
            })
        }
      

        if (!status  ) {
			status = "Draft";
		}

        //find  instructor details
        const userId = req.user.id;     //ye user object auth middleware se pass kiya ja raha he req object me jab authentication kiya ja raha tha
        const instructorDetails = await User.findById(userId );         // Yahaan User.findById(userId, {accountType: "Instructor"}) ke dwara, aap userId ke sath User model se details fetch kar rahe hain, lekin aap sirf un documents ko fetch kar rahe hain jo accountType ki value "Instructor" hai.
    




        if(!instructorDetails)
        {
            return res.status(404).json({
                success: false,
                message: 'Instructor details not found'
            })
        }



        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);       //yaha par dekha ja raha he ki ye Category admin ke dwara banaya gaya  he ya nahi
        if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}



        //upload image to cloudinary
        const thumbnailImage = await uploadImage(thumbnail, process.env.FOLDER_NAME)



        const pincode = instructorDetails.pincode; 
        // console.log("pincode",pincode);
        // console.log('instructor details',instructorDetails);


        //create entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price, 
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
			      instructions: instructions,
            pincode:pincode
            
            
        })

        
        //add new course to User schema of instructor
        await User.findByIdAndUpdate(
          {
            _id: instructorDetails._id,
          },
          {
            $push: {
              courses: newCourse._id,
            },
          },
          { new: true }
        )

        // console.log('courses in instructor details',instructorDetails.courses)


        //update tag ka schema
        const categoryDetails2 = await Category.findByIdAndUpdate(
          { _id: category },
          {
            $push: {
              courses: newCourse._id,  
            },    
          },
          { new: true }
        ).populate('courses').exec();
        
        console.log("HEREEEEEEEE", categoryDetails2)


        //return response
        return res.status(200).json({  
            success: true,
            message: 'Course created successfully',
            newCourse
        })
 

    }catch(error){
        console.log(error)
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to create Course, error: ', 
            error:error,
            
        })  
    }
}





//................................................get (all courses) handler function............................................
const showAllCourse =async (req, res) => {
    try{
        const allCourse = await Course.find({}, {courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                // ratingAndReview:true,
                                                // studentsEnrolled:true,
                                             }).populate('instructor').exec();   

 
        return res.status(200).json({ 
            success: true,
            message: 'All courses fetched successfully',
            allCourse
        })
        


    }catch(error){
        return res.status(404).json({
            success: false,
            message: 'Failed to fetch all  courses details',
            error: error,
        })

    }
}





//................................................get course details................................
const getCourseDetails = async (req, res) => {
    try{
        //get course id
        const {courseId} = req.body;

        //find course details
        const courseDetails = await Course.find({_id: courseId})
                                          .populate({
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionDetails",
                                                    }

                                            })
                                            .populate("category")
                                            //.populate("ratingAndReview")
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                     path:"Subsection",
                                                }
                                            })
                                            .exec();

        //validation
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: 'Course details not found'
            })
        }
        
        return res.status(200).json({
            success: true,
            message: 'Course details fetched successfully',
            courseDetails
        })

        

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch course details',
            error: error.message,
        })
    }
}







const getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      console.log(instructorCourses)
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }




  // Delete the Course
const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnroled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }




  const getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }




  const editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        // .populate({
        //   path: "instructor",
        //   populate: {
        //     path: "additionalDetails",
        //   },
        // })
        .populate("category")
        // .populate("ratingAndReviews")
        // .populate({
        //   path: "courseContent",
        //   populate: {
        //     path: "subSection",
        //   },
        // })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }


module.exports = {createCourse, showAllCourse, getCourseDetails, getInstructorCourses, deleteCourse, getFullCourseDetails , editCourse};
 