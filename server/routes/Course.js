const express = require('express');
const router = express.Router();


const { auth, isInstructor, isStudent, isAdmin  } = require('../middleware/auth');
const { createCourse, getCourseDetails, showAllCourse } = require('../controllers/Course');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const { updateSubsection, deleteSubsection, createSubsection } = require('../controllers/Subsection');
const { createCategory, showAllCategories, categoryPageDetails } = require('../controllers/Category');
const { createRating, getAverageRating, getAllRatingAndReview, getReviewsOnCourse } = require('../controllers/RatingAndReview');



// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************


router.post('/createCourse', auth, isInstructor, createCourse); 

router.post('/addSection', auth, isInstructor, createSection);

router.post('/updateSection', auth, isInstructor, updateSection);

router.post('/deleteSection', auth, isInstructor, deleteSection);

router.post('/updateSubsection', auth, isInstructor, updateSubsection);

router.post('/deleteSubsection', auth, isInstructor, deleteSubsection);

router.post('/addSubsection', auth, isInstructor, createSubsection);

router.get('/showAllCourse', showAllCourse); 

router.post('/getCourseDetails', getCourseDetails)



 

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// TODO: Put IsAdmin Middleware here
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory )
 
//student can see all categories 
router.get("/showAllCategories",showAllCategories )

//course is listing based on category name
router.post("/getCategoryPageDetails", categoryPageDetails) 




// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
//creating rating and review only by student
router.post("/createRating", auth, isStudent,createRating )

//get average rating
router.get("/getAverageRating", getAverageRating)
//get all rating and review
router.get("/getReviews", getAllRatingAndReview)
//get rating and review on specific course
router.post('/getReviewsOnCourse', getReviewsOnCourse)




module.exports = router;
