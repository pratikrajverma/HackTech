const express = require('express');
const app = express();



//importing
const{cloudinaryConnect} = require('./config/cloudinary');
const database = require('./config/database');
const fileupload = require('express-fileupload');
const cors = require('cors');
const cookieParser =  require('cookie-parser');
require('dotenv').config(); 

    
  
  
//set port number
const PORT = process.env.PORT || 4000;

//database connection
database.connectDB();

//cloudinary connection
cloudinaryConnect() 
 
    
//middleware   

app.use(express.json());
app.use(cookieParser());
app.use(cors({
            origin: 'http://localhost:3000',
            credentials:true,
        }));
app.use(fileupload({
            useTempFiles: true,   
            tempFileDir: '/tmp',
        }));    
   
  
 
  
     
     
const userRoutes = require('./routes/User');    
const profileRoutes = require('./routes/Profile');    
const paymentRoutes = require('./routes/Payment');    
const courseRoutes = require('./routes/Course');  
const contactUsRoute = require("./routes/contactRoutes");  

 
//routes handling
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/reach', contactUsRoute); 


//default route
app.use('/',(req,res)=>{ 
    return res.json({
        success:true,
        message:'welcome to Backend Server of hacktech '
    })
})

 

 

        
        

        


//server initialisation
app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
})


