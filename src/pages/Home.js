import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import { HighlightText } from '../comonents/core/Homepage/HighlightText';
import CTAbutton from '../comonents/core/Homepage/Button';
 
import instructorTeaching from '../assets/Images/Instructor_teaching.mp4';
import CodeBlocks from '../comonents/core/Homepage/CodeBlocks';
 
import TimeLineSection from '../comonents/core/Homepage/TimeLineSection';
import InstructorSection from '../comonents/core/Homepage/InstructorSection';
// import ExploreMore from '../comonents/core/Homepage/ExploreMore'
import Footer from '../comonents/common/Footer';
import OldLandingPage from '../comonents/core/Homepage/OldLandingPage'
 


 

const Home = () => {
  return (
    <div className='relative  flex flex-col     text-richblack-300'>

{/*..........................................................( section 1 ).................................................. */}


        <div className='flex flex-col items-center mx-auto w-11/12    '>
                <div className='group mx-auto mt-16 rounded-full bg-richblue-800 font-bold text-richblack-200  
                                transition-all duration-200 hover:scale-95 w-fit  '>

                    <Link to={"/signup"}>
                            <div className='group-hover:bg-richblack-800  hover:outline-dashed outline-caribbeangreen-50  flex items-center gap-2 rounded-full px-10 py-[5px] m-1 my-1  '>
                                <p>Become an Instructor</p>
                                <FaArrowRight />
                            </div>  
                    </Link>

                </div>

            <div  className='text-center text-4xl font-semibold mt-4'>
                Empower your future with 
                <HighlightText text={"coding skills"}/>
            </div>

            <div className=' w-[75%] mx-auto text-center text-lg text-richblack-300 mt-4'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

                        {/* NOTE:  jo kuch bhi component ke bich me rahta he wo us component ka childreen ban jata he*/}
            <div className='flex gap-7 mt-8'>
                <CTAbutton linkto= "learn_more" active={"bg-yellow-100 "} >
                        Learn More           
                </CTAbutton>

                <CTAbutton linkto="sign_in" active={"bg-white"}>
                    Book a Demo
                </CTAbutton>
            </div>

                    {/* NOTE:  Tailwind CSS ke sath custom CSS ko apply karne ke liye, aapko custom classes ya Tailwind CSS ke utilities ka istemal karna padega. Lekin agar aapko specific inline CSS apply karna hai, to aap JavaScript object ke andar pass kar sakte hain, jaise ki aapne kiya */}

            <div className='mx-3 my-12    -z-0 relative'    
                style={{ boxShadow: '20px 20px 0px 0px #F5F5F5'  }} >
                <video
                    muted 
                    loop
                    autoPlay
                    width={800}
                    >
                    {/* <source src={banner} type="video/mp4"  /> */}
                    <source src={instructorTeaching} type="video/mp4" />
                </video>

                <div className='absolute h-[295px] w-[200px] left-[70%] opacity-60 rounded-full top-0 -z-10 ' 
                    style={{ boxShadow: '-10px -10px 40px 0px  #65C7F7    '}} >
                </div> 
                <div className='absolute h-[295px] w-[252px] left-[2%] opacity-60 rounded-full top-0 -z-10 ' 
                    style={{ boxShadow: '-10px -10px 40px 0px  #65C7F7    '}} >
                </div> 

            </div>

            
            {/*code blocks 1  */}
            {/* <div>
                <CodeBlocks 
                    position={'flex-row'}   
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your 
                            <HighlightText text={"coding potential  "}/>
                            with our online courses
                        </div>
                        
                    }
                    subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                    ctabtn1={
                        {
                            btnText:"Try it Yourself",
                            linkto: "/signup",
                            active: "bg-yellow-100 ",
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto: "/login",
                            active: "bg-white",
                        }
                    }

                    codeblock={`<!DOCTYPE html> \n <html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n /nav> `}
                    codeColor={'text-yellow-25'}

                    backgroundGradient={
                        {
                            bg1:"#8A2BE2",
                            bg2:"#FA5002",
                            bg3:"#F8F8FF"
                        }
                    }
                ></CodeBlocks>
            </div> */}


            {/*code blocks  2  */}
            <div>
                <CodeBlocks 

                    position={'lg:flex-row-reverse'}   
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start 
                            <HighlightText text={"coding  "}/>
                            <br></br>
                            <HighlightText text={"in seconds"}/>

                        </div>
                        
                    }
                    subheading={'Go ahead, give it a try. Our hands-on learning environment means you will be writing real code from your very first lesson.'}
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            linkto: "/signup",
                            active: "bg-yellow-100",
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto: "/login",
                            active: "bg-white",
                        }
                    }

                    codeblock={`<!DOCTYPE html> \n <html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n /nav> `}
                    codeColor={'text-yellow-25'}

                    backgroundGradient={
                        {
                            bg1:"#1FA2FF",
                            bg2:"#12D8FA",
                            bg3:"#A6FFCB"
                        }
                    }
                ></CodeBlocks>
            </div>


            {/* ........................(Old Landing pages of HackTech)-------------------- */}
            <div  >
                <OldLandingPage  ></OldLandingPage>
            </div>

            
            {/* ............( Explore more )............ */}
            {/* <ExploreMore/> */}


        </div>       






{/* ...........................................................( section 2 )................................... */}


        <div className='bg-pure-greys-5 text-richblack-700  pb-16'>
               
            <div className=' flex gap-7 justify-center items-center  homepage_bg h-[300px]'>

                <CTAbutton active={"bg-yellow-100 "} linkto={"signin"}>
                    <div className='flex items-center gap-3'>
                        Explore Full Catalog
                        <FaArrowRight />
                    </div>
                </CTAbutton>

                <CTAbutton active={"bg-black"} linkto={"signup"}  >
                    <div  >Learn more</div>
                </CTAbutton>


            </div>
        

            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center mt-[90px]  gap-7'>
                <div className='flex gap-5 justify-center'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the skills you need for a  
                        <HighlightText text={"job that is in demand."}></HighlightText>
                    </div>


                    <div className='flex flex-col gap-10 items-start w-[45%]'>
                         The modern HackTech is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills. 
                        <CTAbutton active={"bg-yellow-100"} linkto={"signin"}>Learn More</CTAbutton>
                    </div>

                </div>


                <TimeLineSection></TimeLineSection>

                {/* <LanguageSection/> */}



            </div>


            
        </div>





{/* ...........................................................( section 3 )................................... */}

    <div className='w-11/12   mx-auto flex flex-col bg-richblack-900 text-white gap-8'>
        
        <InstructorSection/>

        <h1 className='text-center  text-4xl font-semibold mt-10'>Reviews from other learners</h1>

        {/* <ReviewSlider/> */}
        

    </div>






{/* ...........................................................( section 4 footer )................................... */}
 
     <div className=' '>
        <Footer/>
     </div>               




    </div>
  )
}

export default Home