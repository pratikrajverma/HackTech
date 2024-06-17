const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
        enum: ["Admin", 'Student', 'Instructor']
    },
    additionDetails:
    {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'Profile'
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    
    image: {
        type: String,

    },
     
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    pincode: {
        type: String,
        required: true,
    },
    subscriber:
        [
            {

                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ],
    subscribing:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ]

})



module.exports = mongoose.model('User', userSchema)














