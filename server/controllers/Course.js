const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const { uploadImage } = require('../utils/imageUploader');

//............................................create (course information) handler function...............................................
 
  
const createCourse = async (req, res) => { 
    try {
        // Fetch data from request body
        const { courseName, courseDescription, category    } = req.body;

          
 
        // Get files from request 
        const thumbnail =   req.files.thumbnail 
        const lectureVideo =   req.files.video  
          console.log('course data details: ', courseName, courseDescription, category, thumbnail, lectureVideo)
        
        // Validation
        if (!courseName || !courseDescription || !category || !thumbnail || !lectureVideo) {
            return res.status(400).json({
                success: false,
                message: 'all  fields are  required for course creation',
            });
        }

        // Find instructor details
        const userId = req.user.id;

        const instructorDetails = await User.findById(userId);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'Instructor details not found',
            });
        } 

        // Check if the provided category is valid
        const categoryDetails = await Category.findById(category);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'Category details not found',
            });
        }

        // Upload image and video to cloud storage
        const thumbnailImage = await uploadImage(thumbnail, process.env.FOLDER_NAME);
        const uploadedVideo = await uploadImage(lectureVideo, process.env.FOLDER_NAME);

        // Create new course entry
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            lectureVideo: uploadedVideo.secure_url,
        
            pincode: instructorDetails.pincode,
        });

        // Add new course to instructor's course list
        await User.findByIdAndUpdate(
            instructorDetails._id,
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        // Update category with the new course
        await Category.findByIdAndUpdate(
            categoryDetails._id,
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Course created successfully',
            newCourse,
        });
    } catch (error) {

        console.error('Error creating course:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create course',
            error: error.message,
        });
    }
};

 





//................................................get (all courses) handler function............................................
const showAllCourse = async (req, res) => {
  try {
    const allCourse = await Course.find({}, {
      courseName: true,

      thumbnail: true,
      instructor: true,
      // ratingAndReview:true,
      // studentsEnrolled:true,
    }).populate('instructor').exec();


    return res.status(200).json({
      success: true,
      message: 'All courses fetched successfully',
      allCourse
    })



  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Failed to fetch all  courses details',
      error: error,
    })

  }
}





//................................................get course details................................
const getCourseDetails = async (req, res) => {
  try {
    //get course id
    const { courseId } = req.body;

    //find course details
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionDetails",
        }

      })
      .populate("category")
      //.populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "Subsection",
        }
      })
      .exec();

    //validation
    if (!courseDetails) {
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



  } catch (error) {
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
      console.log('deleteCourse data: ' + req.body)
      const { courseId } = req.body

      // Find the course
      const course = await Course.findById(courseId)

      if (!course) {
        return res.status(404).json({ message: "Course not found" })
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




 

module.exports = { createCourse, showAllCourse, getCourseDetails, getInstructorCourses, getFullCourseDetails , deleteCourse  };
