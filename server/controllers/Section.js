const Section = require('../models/Section');
const Course = require('../models/Course');




//................................................................create section data..................................
const createSection = async (req,res) =>{
    try{
        //fetch data
        const{sectionName, courseId} = req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            })
        } 

        //create section
        const newSection = await Section.create({sectionName})


        //update Course document with new section objectId inside corseContent[] array
        const updatedCourse = await Course.findByIdAndUpdate(courseId,  
                                                            {$push: {courseContent: newSection._id}},   
                                                            {new:true} )
                                                            .populate({
                                                                path: "courseContent",
                                                                populate: {
                                                                    path: "Subsection",
                                                                },
                                                            })
                                                            .exec();

        //return response
        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            updatedCourse
        })




    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Error in creating section',
            error: err.message
        })
    }
}




//.........................................................update section data..............................................................
const updateSection = async(req,res)=>{
    try{   
        //fetch data
        const {sectinName, sectionId} =     req.body;

        //data validation
        if(!sectinName || !sectionId ){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            })
        }



        //update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,   {sectinName},   {new:true} );

        //return response
        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            updatedSection
        })


    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Error in updating section'
        })
    }
}





//....................................................delete section................................................
const deleteSection = async (req, res)=>{
    try{
        //section id fetch
        const {sectionId } = req.params;

        //data validation
        if(!sectionId ){
            return res.status(400).json({
                success: false,
                message: 'Please fill sectionId'
            })
        }

        //delete section
         await Section.findByIdAndDelete(sectionId);


        
        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully',
        
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success: false,
            message: 'Error in deleting section'
        })
    }
}


module.exports = {createSection, updateSection, deleteSection}