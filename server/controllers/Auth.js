const OTP = require('../models/OTP');
const User = require('../models/User');
const Profile = require('../models/Profile')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const mailSender = require('../utils/mailSender'); 
const { passwordUpdated } = require("../mail/templates/passwordUpdate");   

//.................................OTP creation and storing OTP to mongodb and in mongodb this OTP will  send by email to user.....................

const sendOTP = async (req, res) => {
    try {
        //fetch email from req ki body
        console.log(req.body); 
        const {email} = req.body;

        //check user is already exist
        const userpresent = await User.findOne({ email: email });

        //if user present then return false
        if(userpresent) {
            return res.status(401).json({
                success: false,
                message: 'User already registered' 
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {       // Yeh code ek OTP (One Time Password) generate karta hai, jo 6 characters ka hota hai. Ismein teen properties di gayi hain jo control karte hain ki kya OTP mein uppercase alphabets, lowercase alphabets aur special characters honge ya nahi
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
                                
        console.log('Generating otp',otp);
        //check unique otp is present or not
        let result = await OTP.findOne({ otp: otp });      //this is checking that is this otp has already created by same user for any other varification if yes then regenrate otp jabtak ki otp db me mil raha he jaise hi otp nahi milega then that will be the final otp
        
        while(result)               //if result is true it means that otp has already created by same user for any other varification so it will be regenrate otp and if result is false then it means current otp db me nahi he
        {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })    
               
            result = await OTP.findOne({ otp: otp }); // Loop ke andar result ko update karein
        }
        
        console.log('generated unique otp: ', otp);


        //create otp entry in database
        const otpBody = await OTP.create({ email, otp });         //otp is storing in data base for later varification and in modals we has defined logic for sending mail for otp and this is pre hook means db me otp save hone se pahle hi mail send ho jayega

        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp
        })

    }
    catch (error) {
        console.log('err in creating otp entry', error);
        res.status(500).json({
            success: false,
            message: 'Error in  creating otp entry'
        })
    }

}

 

 
//..................................................SignUp data.................................

//sign up
const signUp = async (req, res) => {
    try {
        //fetch data from req ki body
        const {
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            pincode,
             
        } = req.body;

        // console.log('backend me aaya huaa data he ',firstname, lastname, email, password, confirmPassword, accountType, otp)

        //validation ho raha he ki koi input khali to nahi he agar ha to return false kar do aur user ko kaho Please fill all the fields
        if (!firstname || !lastname || !email || !password || !confirmPassword  || !otp || !pincode) {
            return res.status(403).json({
                success: false,
                message: 'Please fill all the fields'
            })
        }  
 
        //dono password match kar lo 
        // if (password  !== confirmPassword) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'password and confirm password does not match backend wala he'
        //     })
        // } 

        //check user already exists or not

        const userpresent = await User.findOne({ email: email });

        if(userpresent) {
            return res.status(400).json({
                success: false,
                message: 'User already registered'
            })
        } 
   
        //find most recently
        const response = await OTP.find({email}).sort({createdAt: -1}).limit(1);                    
        // const response = await OTP.find({email});    
                        
        console.log('recent otp : ', response);

        //validate otp
        if (response.length === 0) {        //Yeh condition check karta hai ki kya koi OTP mila ya nahi. Agar recentOtp ka length 0 hai, matlab koi OTP nahi mila, toh yeh condition true hoti hai.
            //otp not found
            console.log(' otp not found'); 
            return res.status(400).json({
                success: false, 
                message: 'OTP not found'  
            }) 
        } else if(otp !== response[0].otp) {      //  Yeh condition check karta hai ki user dvara diya gaya OTP, jo otp variable mein hai, kya match karta hai recentOtp object mein retrieve kiya gaya OTP ke saath. Agar match nahi hota, toh yeh condition true hoti hai.
            //Ivalid otp
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'  
            })
        }




        //password hashing algorithm
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user entry in database

            //profile entry
            const profileDetails = await Profile.create({
                gender: "",
                dateOfBirth: "", 
                about: "",
                contactNumber: ""
              })


        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            accountType,
            additionDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
            pincode,
 
        });

 
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            user,
        })


    } catch (error) {
        console.log('error in user signup', error);
        res.status(500).json({
            success: false,
            message: 'Error in user signup please try again'
        })
    }

 
}


 
 
     
 
//...................................................Login data....................................


//login
const login = async(req,res) => {
    try{
        //fetch data from req ki body
        const {email,password} = req.body;

        //validation
        if(!email || !password)
        {
            return res.status(403).json({
                success:false,
                message:'please fill email and password'
            })
        }

        //check user exist or not
        const  user = await User.findOne({email: email });

        if(!user) 
        {
            return res.status(401).json({
                success:false,
                message:'user not found please signup first'
            })
        }

 
       

        //compare password and create jwt token
        if(await bcrypt.compare(password, user.password))
        {
               //creating paylod for jwt token
               const payload = {
                    email: user.email,
                    id: user._id,
                    accountType: user.accountType
               }
 
            const token = jwt.sign(payload,  process.env.JWT_SECRET,   {expiresIn:'2h'});

            user.token = token;
            user.password=undefined;


               //creating options object for cookie
               const options={
                expires: new Date(Date.now() + 3*24*60*60*1000),      //this is time  for 3 days
                httpOnly: true, 
               }  
 

            //create cookies
            res.cookie('token', token, options).status(200).json({                  //yaha par 1st argument me token ka nam he  and 2nd argument me token ki value he and 3rd argument me coookie ki validation he 
                success:true,
                token,
                user,
                message:'Login successfully'
            })


        }else{
            return res.status(401).json({
                success:false,
                message:'Invalid password '
            })
        }




    }catch(error){
        console.log('error in login', error);
        res.status(500).json({
            success:false,
            message:'Error in login please try again'
        })
    }

}




//...............................................change Password logic..................................


//change password
const changePassword =async (req, res) =>{
    try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);

		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, 
                        message: "Your old password is incorrect"
                    });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// encrypt new password 
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
        
        //update password in user details
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstname} ${updatedUserDetails.lastname}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} 
        catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}


		// Return success response
		return res.status(200).json({ 
            success: true, 
            message: "Password updated successfully" 
        });


	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
}




module.exports = { sendOTP, signUp, login, changePassword };