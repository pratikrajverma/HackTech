const Profile = require('../models/Profile');
const User = require('../models/User');
const  {uploadImage} = require('../utils/imageUploader')

//.............................................update profile................................................................


const updateProfile = async (req, res) => {
    try{    
        //fetch data from req ki body
        const {dateOfBirth="", about="", gender, contactNumber} = req.body;

        // fetch userId
        const id = req.user.id;

        //validation
        // if( !gender ||!contactNumber){
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Please fill all the fields'
        //     })
        // }

        //fetching user details
        const userDetails = await User.findById(id);

        //fetching profile Id
        const profileId = userDetails.additionDetails;

        //updating profile details
        const updatedProfile = await Profile.findByIdAndUpdate(profileId,   {dateOfBirth, about, gender, contactNumber},   {new:true} );

        //return response
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            updatedProfile
        })



    }catch(error){
        return res.status(500).json({
            success: false,
            message:'somthig went wrong while updating profile'
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

const getAllUserDetails = async (req, res) => { 
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

 
  module.exports = {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses}