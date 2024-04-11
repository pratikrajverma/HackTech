const express = require('express');
const router = express.Router();

const {auth} = require('../middleware/auth');

const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses} = require('../controllers/Profile');









// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

//deleting user profile
router.delete('/deleteProfile',auth, deleteAccount);

//updating user profile
router.put('/updateProfile', auth, updateProfile);

 
//fetching user profile
router.get('/getUserDetails', auth, getAllUserDetails);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

//update profile picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture)


module.exports = router;




