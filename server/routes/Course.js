const express = require('express');
const router = express.Router();


const { auth, isInstructor, isStudent, isAdmin  } = require('../middleware/auth');
const { createCourse,    getCourseDetails, showAllCourse, getInstructorCourses ,   getFullCourseDetails } = require('../controllers/Course');
 
const { createCategory, showAllCategories, categoryPageDetails } = require('../controllers/Category');
 



// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************


router.post('/createCourse', auth, isInstructor, createCourse); 

 

router.get('/showAllCourse', showAllCourse); 

router.post('/getCourseDetails', getCourseDetails)

 
 

router.post("/getFullCourseDetails", auth, getFullCourseDetails)
 
 
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
 

 
//course is listing based on category name
router.post("/getCategoryPageDetails", categoryPageDetails)  




 

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
 
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory )
 
//student can see all categories 
router.get("/showAllCategories",showAllCategories )




 


module.exports = router;
