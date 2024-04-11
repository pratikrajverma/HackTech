const mongoose = require('mongoose');


const ContactusFormSchema = new mongoose.Schema({
   firstname:{
      type: String,
      required: true
   },
   lastname:{
      type: String,
      required: true
   },
   email:{
    type: String,
    required: true,
   },
   message:{
      type: String,
      required: true,
      trim: true
   },
   phoneNo:{
    type: Number,
    required: true,
   }
   

   
}) 
   

module.exports = mongoose.model('ContactusForm', ContactusFormSchema)
