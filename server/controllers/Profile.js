const Profile = require('../models/Profile');
const User = require('../models/User');
const  {uploadImage} = require('../utils/imageUploader')

//.............................................update profile................................................................


const updateProfile = async (req, res) => {
  try {
    const {
      firstname = "",
      lastname = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body


    const profile = await Profile.create( {
      dateOfBirth,
      about,
      contactNumber,
      gender,
    })

    console.log("profile updated", profile)


    const id = req.user.id

 
 
    const user = await User.findByIdAndUpdate(id, {
      firstname,
      lastname,
      additionDetails:profile._id,
    })
 
     

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
 
    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}



//.........................................delete account..................................................
const deleteAccount = async (req, res) => {
    try{
        //fetch user Id
        const userId = req.user.id;

        //validation
        const userDetails = await User.findById(userId);
        if(!userDetails)
        {
            return res.status(404).json({
                success:false,
                message:'user not found',
            })
        }

        //profile details
        await Profile.findByIdAndDelete({_id:userDetails.additionDetails});

        // delete user
        await User.findByIdAndDelete(userId);

        //return response
        return res.status(200).json({
            success: true,
            message: 'Account deleted successfully',
        })

        

    }catch(error){
        return res.status(500).json({
            success: false,
            message:'somthig went wrong while deleting account'
        })
    }
}




//.......................................get user details...............................................

const getUserDetails = async (req, res) => { 
    try{
        //fetch user Id
        const userId = req.user.id;
        console.log(userId);
        const userDetails = await User.findById(userId).populate("additionDetails").exec();

        if(!userDetails)
        {
            return res.status(404).json({
                success:false,
                message:'user not found',
            })
        }

        console.log(userDetails);

        return res.status(200).json({
            success: true,
            message: 'User details fetched successfully',
            userDetails
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message:'somthig went wrong while getting user details'
        })
    }
}


// ...................get all user who register in Hacktech................................

const getAllUsers = async (req, res) => { 
    try{
        const users = await User.find().exec();

        if(!users)
        {
            return res.status(404).json({
                success:false,
                message:'user not found',
            })
        }

        console.log("all user details : ",users);
        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            users
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message:'somthig went wrong while getting user details'
        })
    }
}




//....................................Image upload to cloudinary..........................................

const updateDisplayPicture = async (req, res) => {
    try {
          //fetch user id from req
          const userId = req.user.id
          
      
         //fetch data from files
          const displayPicture = req.files.displayPicture
          console.log(displayPicture);

          
          //upload image to cloudinary by imageUploader function
          const image = await uploadImage(
            displayPicture, 
            process.env.FOLDER_NAME,
            1000,
            1000 
            )
            
            console.log(image) 
            
            //update user details
          const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
          )

          
          //return response
          res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          })
    }
    catch(error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: `error in updating display Picture :  ${error.message}`,
        error,
      })
    }
};
  



//...................................................get enrolled course............................

const getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

 

const instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnroled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}



  module.exports = {updateProfile,  deleteAccount, getUserDetails, getAllUsers,  instructorDashboard, updateDisplayPicture, getEnrolledCourses}