import React, { useState } from 'react'
import './usercard.css'
import {userSubscribing} from '../../../services/operations/profileAPI'
import {useSelector} from 'react-redux'




const UserCard = (user) => {

  const [subscribe, setSubscribe] = useState(false);
  const { token } = useSelector((state) => state.auth)

  const subscribeButton = ()=>{
    setSubscribe(!subscribe);
    if(subscribe){
      userSubscribing(token,user.user._id)
      console.log('subscribing data',user,user)
    }
  }
 


  console.log('single user ka data : ', user);
  return (
    <div className='mb-10 border border-pure-greys-400  text-pure-greys-5 w-[25rem] flex flex-col gap-5 p-3 rounded-md z-0 hover:border-x-lime'  >
      <div className=' w-[370px] h-[250px] mx-auto relative cursor-pointer'>
        <img src={`${user.user.image}`} className=' w-[370px] h-[250px] z-10 ' ></img>
        <div className='bg-blue-500 h-[5rem] aspect-square rounded-full blur-2xl absolute right-40 -z-10'></div>
      </div>

 
        <div className='flex flex-col p-3     gap-2'>
          <p className='text-blue-100 font-bold text-2xl'>{user.user.firstname} {user.user.lastname}</p>
          <p className='text-yellow-100'>{user.user.email}</p>
          <div className='flex mt-5  justify-center items-center'>
              <button className={`hover:bg-lime transition-all duration-200 border border-pure-greys-300 font-bold text-2xl 
                                    px-3 py-1 rounded-md active:scale-95 ${subscribe ? 'bg-richblack-600':null }  `}  
                      onClick={subscribeButton}
                                    >
                                    {
                                        subscribe ? 'Subscribed' : 'Subscribe'
                                    }
                                      </button>
          </div>

 
      </div>
    </div>
  )
}

export default UserCard