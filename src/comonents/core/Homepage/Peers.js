import React from 'react'
import peers from '../../../assets/Images/peers.webp'
import { Link } from 'react-router-dom'
const Peers = () => {
  return (
    <div className='w-[300px] h-[25rem] peers  hover:outline-dashed outline-caribbeangreen-50  bg-richblue-700  rounded-lg overflow-hidden bg-opacity-80 max-h-max '> 
   
        <div className='p-3'>
            <img src={peers }  className='w-[280px] h-[180px]'></img>
        </div>

        
        <div className='text-white mt-3 font-semibold text-3xl  p-4 leading-6'>
            <h1>Peers Interaction</h1>
        </div>

        <div className='text-center'>
         <Link to='signup'>
            <button className='py-2 text-pure-greys-50  font-bold w-40 my-[3.7rem] rounded-md active:scale-95  bg-blue-300 hover:scale-95 hover:bg-caribbeangreen-500'  >
                    Start
            </button>
         </Link>
        </div>
        
        
        
    </div>
    
  )
}

export default Peers