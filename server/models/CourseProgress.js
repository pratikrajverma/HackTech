const mongoose = require('mongoose');


const CourseProgressSchema = new mongoose.Schema({
    CourseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Course'
    }, 
    completedVideos:[
        {   
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subsection'
        }
    ]
 
    
}) 
    

module.exports = mongoose.model('CourseProgress', CourseProgressSchema)














