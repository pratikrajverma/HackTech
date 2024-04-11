const {instance} = require('../config/razorpay');
const Course = require('../models/Course')
const User  = require('../models/User');
const mailSender = require('../utils/mailSender');
const courseEnrollmentEmail = require('../mail/templates/courseEnrollmentEmail');
const { set } = require('mongoose');

//.............................. innitiate the Razorpay order.....................................
const capturePayment = async (req, res) => {
                                                    //Payments ke process mein, ek order create karna zaroori hota hai takay payment gateway ko transaction ke liye saari zaroori jaankari milti hai. Neeche diye gaye reasons hain ki order create karna kyun zaroori hai:
                                                    //Transaction Information: Order create karne se pehle, aapko payment transaction ke liye saari zaroori jaankariyan provide karni hoti hain jaise amount, currency, aur kuch additional notes. Yeh information payment gateway ko transaction process karne ke liye di jaati hai
                                                    //Unique Identifier: Har transaction ka unique identifier hona zaroori hai. Order create karke, aap ek unique order ID generate karte hain jo ki transaction ko uniquely identify karta hai.
        

       //get courseId and userId
       const {courseId} = req.body;
       const userId = req.user.id;

       //validation
       if(!courseId){
            return res.status(400).json({
                success: false,
                message: 'valid courseId is required'
            })
       }


       //validation courseId details
        let course;
        try{
            course = await Course.findById(courseId);

            if(!course){
                return res.status(400).json({
                    success: false,
                    message: 'could not find the course'
                })
            }
            
            
            //check if user already pay for the same course
            
            const userObjectId =  new mongoose.Types.ObjectId(userId);   //req.user.id me user ki id string me store hoti he but Course model me studentEnrolled array me user ki id mongoose.Type.ObjectId me store hoti he so thats way i have convert this from string to mongoose object id

            if(course.studentsEnrolled.includes(userObjectId)) {
                return res.status(200).json({
                    success: false,
                    message: 'you are already enrolled in this course'
                })
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

        
        //setting course amount and currency
        const amount = course.price;
        const currency = 'INR';
        
        //create order for course purchase
        const options = {                       //const options = { ... }: Ek options object banaya gaya hai jo payment ke liye various configurations ko store karega.
            amount: amount*100,                      //this is syntax of razorpay documentation that price me * 100 hoga 
            currency:currency,                          //Payment currency INR set kiya gaya hai.

            receipt:Math.random(Date.now()).toString(),     //Ek random receipt number generate kiya gaya hai, jo unique transaction ko identify karne ke liye upyogi hai.  
            notes:{                                         // Additional notes ko store karne ke liye ek object banaya gaya hai, jisme courseId aur userId ko save kiya gaya hai 
                courseId: courseId,
                userId
            }
        }

        try{
            //initiate the payments using razorpay
            const paymentResponse = await instance.orders.create(options);      //1. Iss line mein instance ek Razorpay ka instance hai jo payment gateway se communication karne ke liye istemal hota hai. orders ek property hai jo instance ke andar rakha gaya hai, jo ki Razorpay ke orders ko create karne ke liye istemal hota hai 
                                                                                //2. create(options) method ko call karne se, hum ek naya payment order create karte hain. Iss method ko call karne ke liye hume options object provide karna hota hai, jisme payment ke liye saari zaroori jaankariyan shamil hoti hain, jaise payment amount, currency, aur kuch additional notes.
                                                                                     
            console.log(paymentResponse);

            //return response
            return res.status(200).json({
                success: true,
                courseName:course.CourseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                amount:paymentResponse.amount,
                currency:paymentResponse.currency,
                message: 'payment initiated successfully',
                paymentResponse
            })

        }catch(error){
            console.log(error);
            return res.json({
                success: false,
                message: 'could not initiate order'
            });
        }

}





//.........................................varify signature of razorpay and server...............................

const varifySignature = async (req, res) => {   //1.Razorpay ke webhooks ko handle karne ke liye, aapko apne server par ek endpoint set karna hota hai jahan se aap Razorpay ke events ko receive kar sakte hain. Ye endpoint typically aapke server ki backend application mein hota hai.
                                                //2. Is code snippet mein, varifySignature function Razorpay ke webhook events ko handle kar raha hai. Jab Razorpay kisi event ko notify karta hai, woh event ke saath ek signature bhi provide karta hai jo verify karna hota hai. Yeh signature verify karta hai ki notification legitimate hai ya nahi.
                                                //3. Agar aapko Razorpay ke events ko handle karne ke liye apne server par webhook set karna hai, to aapko Razorpay ke dashboard mein jaake apne webhook URL ko configure karna padega. Webhook URL typically aapki backend server ki URL hogi jahan yeh varifySignature function ya kuch equivalent uskaam karta hai.
                                                //4.   Set up an endpoint on your server to handle Razorpay webhook events.
                                                    // a. Configure this endpoint URL in your Razorpay dashboard.
                                                    // b. Whenever a payment event occurs on Razorpay, Razorpay will send a notification to this endpoint.
                                                    // c. Your server will verify the signature of the notification using varifySignature function or equivalent logic.
                                                    // d. If the signature is valid, your server will process the event accordingly (e.g., enroll a user in a course, update database, send confirmation email, etc.).
                                                    // e. If the signature is invalid, your server will reject the notification.
                                                //5.Webhook Configuration in Razorpay Dashboard: Pehle, aapko Razorpay ke dashboard mein jaana hoga aur wahan par aapko apne webhook endpoint ka URL set karna hoga. Is URL ko Razorpay ko pata chal jaata hai ki woh kis server ko event notifications bhejega.
                                                //6.Webhook Secret: Aap apne server par ek secret generate karte hain, jo ki aapki server aur Razorpay ke beech secure communication ke liye use hota hai. Jab aap apne webhook URL ko Razorpay dashboard mein configure karte hain, aapko yeh secret bhi provide karna hota hai. Jab Razorpay aapko notification bhejta hai, woh is secret ka istemal karke signature generate karta hai jo notification ke saath bheja jaata hai.
                                                //7.Request Verification: Jab aapki server ko koi request milta hai, jaise ki payment notification, aap is webhook secret ka istemal karke request ko verify karte hain. Agar signature verify hota hai, toh aap jaante hain ki request legit hai aur aap uspe further actions perform kar sakte hain
                                                //8. Request Processing: Agar aapki server ne request ko verify kiya aur uska signature sahi hai, toh aap desired actions ko perform karte hain, jaise ki user ko enroll karna, database update karna, email bhejna, etc.
                                                //9. To summarize, Razorpay aapko webhook notifications bhejne ke liye aapke dwara configure kiye gaye endpoint URL ka istemal karta hai. Aapki server ko notification milne ke baad, aap verify karte hain ki notification legitimate hai ya nahi, secret key ka istemal karke. Agar verification successful hota hai, toh aap desired actions perform karte hain.
                                                //10. Jab aap apne backend server ka URL Razorpay ke dashboard mein set karte hain, toh Razorpay aapki server ko notifications bhejne ke liye us URL ka istemal karta hai. Jab bhi koi transaction ya koi event hota hai, Razorpay apne backend system se aapki server ko notification bhejta hai.




    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];
    

    //converting webhookSecret to digest 
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex"); 
    


    //now matching signature and webhookSecret
    if(signature === digest) {
        console.log('payment is Authorized');

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
            //find course and add student id to their studentenrolled property array
            const enrolledCourse = await Course.findByIdAndUpdate({_id: courseId},  
                                                                {$push:{studentsEnrolled : userId}},  
                                                                {new:true}); 

            if(!enrolledCourse)
            {
                return res.status(500).json({
                    success: false,
                    message: 'could not find the course'
                })
            }
            console.log(enrolledCourse);



            //find student and add course id to their course property array
            const enrolledUser = await User.findByIdAndUpdate({_id: userId},
                                                            {$push: {courses: courseId}},
                                                            {new:true})

            console.log(enrolledUser);
                


            //send confirmaiton email to student
            const emailResponse = await mailSender(enrolledUser.email, 
                                                    "congratulation from Hacktech", 
                                                    courseEnrollmentEmail(enrolledUser.firstname, enrolledCourse.courseName));
                                                    
            console.log(emailResponse);

            //return response
            return res.status(200).json({
                success:true,
                message: 'signature varified and course enrolled successfully',
            })
       




        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

    }else{
        return res.status(400).json({
            success: false,
            message: 'invalid signature'
        })
    }




}

module.exports = {capturePayment, varifySignature}


