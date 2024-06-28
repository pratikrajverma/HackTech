import React from 'react'
 
import { HighlightText } from '../comonents/core/Homepage/HighlightText';
import CTAbutton from '../comonents/core/Homepage/Button';

 
import CodeBlocks from '../comonents/core/Homepage/CodeBlocks';

 
// import ExploreMore from '../comonents/core/Homepage/ExploreMore'
import Footer from '../comonents/common/Footer';
import OldLandingPage from '../comonents/core/Homepage/OldLandingPage'
import landingPageImage from '../assets/Images/landing_page.webp'





const Home = () => {
    return (
        <div className='relative  flex flex-col  lg:gap-1 gap-20   text-richblack-300'>

            {/* section 1 */}
            <div className='flex flex-col items-start   lg:w-11/12  '>

                <div className='lg:w-screen  lg:h-screen overflow-hidden  bg-caribbeangreen-300 bg-opacity-20'>
                    <img src={landingPageImage}
                        className='opacity-30 '
                    />
                </div>

                <div className='flex flex-col absolute gap-y-5  pl-3 w-[100%]  lg:w-[450px] lg:ml-60 mt-32'>
                    <p className='text-caribbeangreen-300'>STARTING WITH HACKTECH BEST LEARNING PLATFORM</p>
                    {/* <p className='text-white text-5xl font-bold'>Learn New Skills Online with Top Hacktech Expert</p> */}
                    <p className='text-white text-5xl font-bold'>Find New Teachers In Your Local Area By Pincode</p>
                    
                    <p className='text-white'>Find teachers in your local-area and interact with them by their phone no or email address. Search by your pin code and watch them by demo videos</p>
                    <div className='flex gap-4'>
                        <CTAbutton active={'bg-caribbeangreen-200'} linkto={'/login'}>Start</CTAbutton>
                        <CTAbutton active={'bg-caribbeangreen-200'} linkto={'/signup'}>New</CTAbutton>

                    </div>
                </div>
            </div>


            {/* .......................... section 2 .............................  */}
            <div className='flex flex-col  items-center w-[95%] h-fit mt-72 lg:pt-0 pt-32     lg:mt-24 mx-auto lg:w-11/12'>
                <OldLandingPage  ></OldLandingPage>


            </div>


            {/* ......................... srction 3 .......................... */}
           <div className='lg:w-11/12 '>
           <CodeBlocks
                position={'flex-row'}
                heading={<div className='text-4xl font-semibold'>
                    Unlock your
                    <HighlightText text={"Learning Potential "} />
                    by finding best Teacher in your area
                </div>
                }
                // subheading={'Go ahead, give it a try. Our hands-on learning environment means you will be writing real code from your very first lesson.'}
                subheading={'Go ahead, and watch teachers Demo videos and find best meet which is suitable for you and connect with teacher and peers by their phone no and address  '}
                ctabtn1={{ btnText: 'Continue lesson', linkto: '/login', active: 'bg-yellow-100' }}
                ctabtn2={{
                    btnText: "Learn More",
                    linkto: "/about",
                    active: "bg-white",
                }}
                codeblock={`<!DOCTYPE html>
                            <html>
                            head><>Example</
                            title><linkrel="stylesheet"href="styles.css">
                            /head>
                            body>
                            h1><ahref="/">Header</a>
                            /h1>
                            nav><ahref="one/">One</a><ahref="two/">Two</
                            a><ahref="three/">Three</a`
                }
                // backgroundGradient={{ bg1: 'caribbeangreen-500', bg2: 'caribbeangreen-500', bg3: 'caribbeangreen-300'}}
                const backgroundGradient={
                    {
                        bg1: "#00f312", // Example light yellow
                        bg2: "#00f312", // Example yellow
                        bg3: "#00f312", // Example bright yellow}
                    }}
                codeColor={'text-yellow-25'}
            ></CodeBlocks>
           </div>


            {/*................................ Footer section ....................*/}
            <div  >
                <Footer />
            </div>
        </div>
    )
}

export default Home