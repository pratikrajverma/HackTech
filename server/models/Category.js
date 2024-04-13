   const mongoose = require('mongoose');


   const CategorySchema = new mongoose.Schema({
      name:{
         type: String,
         required: true
      },
      description:{
         type: String,
         required: true
      },
      courses:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Course',
         required: true
      }]

 
      
   }) 
      

   module.exports = mongoose.model('Category', CategorySchema)
