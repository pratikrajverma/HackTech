// import React, { useEffect, useState } from 'react'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
// import TimelineImage from '../../../assets/Images/TimelineImage.png'

import TimelineLeftBox from './TimelineLeftBox'



const timeline=[
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Fully committed to the success company",
  },
]


const TimeLineSection = () => {
 

  return (
     
        <div className='flex gap-20 items-center  m-20 '>
            <div className='w-[100%] flex flex-col gap-14 relative'>
              {
                timeline.map((element, index) =>{     //Is case mein, aapka timeline array ke har ek element ke liye ek TimelineLeftBox component banaya ja raha hai, aur fir un sabhi components ko ek array mein add kiya ja raha hai. Isi wajah se, return statement ke andar jo .map() method use ho raha hai, wo ek array of components ko return kar raha hai
                  return(

                    <TimelineLeftBox  key={index} element={element} index={index}  />
                      
                  )
                })
              }
                <div className='absolute top-[40%] right-1  rounded-full     h-[100px] w-10 bg-blue-200 blur-3xl  '></div>
                <div className='absolute top-[40%]   rounded-full     h-[150px] w-10 bg-blue-200 blur-3xl  '></div>

            </div>

            <div className='relative flex flex-col  z-20'  >
                 
            


      
                

            </div>

        </div>
    
    )
  }
  
  export default TimeLineSection                  
  
  //The key attribute in React is a special attribute used for lists of elements. It helps React identify which items have changed, are added, or are removed. However, it is not passed as a prop to the component. React automatically handles the key attribute internally and does not expose it as a prop.
  