
const Subsection = require('../models/Subsection');
const Section = require('../models/Section');
const {uploadImage} = require('../utils/imageUploader');

require('dotenv').config();

//...............................................................create subsection...........................................................
const createSubsection = async (req, res)=>{
    try{
        //fetch data
        const {sectionId, title,   description} = req.body;

        //extract video file
        const video = req.files.video;

        //validation
        if(!sectionId || !title   || !description || !video)
        {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required'
            })
        } 

        //upload video to cloudinary
        const uploadDetails = await uploadImage(video, process.env.FOLDER_NAME);
        console.log(uploadDetails);
        
        //create sub-section details
        const SubsectionDetails = await  Subsection.create({
            title: title,
            // timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url
        })

        console.log('this is subsection detail : ',SubsectionDetails);

        //update section document with this sub-section objectId inside Subsection[]  array
        const updatedSection  = await Section.findByIdAndUpdate({_id:sectionId},  
                                                                { $push: {Subsection:SubsectionDetails._id}},  
                                                                {new:true}) 


        console.log(updatedSection);

        //return response
        return res.status(200).json({
            success: true,
            message: 'Subsection created successfully',
            updatedSection
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            message: 'Something went wrong while creating subsection'
        })
    }
}



//................................................................update sub-section................................. 
const updateSubsection = async(req,res)=>{
    try{
        //fetch data
        const {subsectionId, sectionId, title, timeDuration, description} = req.body;

         //extract video file
         const video = req.files.videoFile;
        
        //validation
        if(!subsectionId|| !sectionId ||!title ||!timeDuration ||!description ||!video)
        {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        
        //upload video to cloudinary
        const uploadDetails = await uploadImage(video, process.env.FOLDER_NAME);
        console.log(uploadDetails);
        

        //update sub-section details
        const updatedSubsection  = await Subsection.findByIdAndUpdate({_id:subsectionId},  
                                                                    {title: title, timeDuration: timeDuration, description: description, videoUrl: uploadDetails.secure_url},  
                                                                    {new:true});

        return res.status(200).json({
            success: true,
            message: 'Subsection updated successfully',
            updatedSubsection
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            message: 'Something went wrong while updating section'
        })
    }
}




//...............................................................Delete Sub-section..................................................


const deleteSubsection = async(req,res)=>{
    try{
        // fetch data
        const {subsectionId} = await req.body;

        //validation
        if(!subsectionId)
        {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        //delete sub-section
        const deletedSubsection = await Subsection.findByIdAndDelete({_id:subsectionId});

        return res.status(200).json({
            success: true,
            message: 'Subsection deleted successfully',
            deletedSubsection
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            message: 'Something went wrong while deleting section'
        })
    }
}







module.exports = {createSubsection, updateSubsection, deleteSubsection}
