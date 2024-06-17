const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },

    courseDescription: {
        type: String,
        required: true,
        trim: true
    },

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },




    thumbnail: {
        type: String,
    },

    lectureVideo: {
        type: String,
        required: true,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },



    pincode: {
        type: String,
        required: true
    }



})

module.exports = mongoose.model('Course', CourseSchema) 