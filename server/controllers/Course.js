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
        await User.findByIdAndUpdate(instructorDetails._id,  {$push: {courses: newCourse._id}},  {new:true}).populate()


        //update tag ka schema
        await Category.findByIdAndUpdate({ _id: category },  {$push: {courses: newCourse._id}},  {new:true}).populate()


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




module.exports = {createCourse, showAllCourse, getCourseDetails };
