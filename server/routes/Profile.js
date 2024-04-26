const express = require('express');
const router = express.Router();

const {auth} = require('../middleware/auth');

const {updateProfile, deleteAccount, getUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard, getAllUsers} = require('../controllers/Profile');

const {isInstructor} = require('../middleware/auth')

const { subscriber} = require('../controllers/Subscriber')









// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

//deleting user profile
router.delete('/deleteProfile',auth, deleteAccount);

//updating user profile
router.put('/updateProfile', auth, updateProfile);

 
//fetching user profile
router.get('/getUserDetails', auth, getUserDetails);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

//update profile picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

router.get("/getAllUsers",getAllUsers)

//......................subscribing............................

router.post("/subscribe", auth, subscriber);

module.exports = router;  




