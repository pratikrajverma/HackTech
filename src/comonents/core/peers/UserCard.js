import React from 'react'
import './usercard.css'

const UserCard = (user) => {
    console.log('single user ka data : ',user);
  return (
    <div className='mb-10 border border-pure-greys-400  text-pure-greys-5 w-[25rem] flex flex-col gap-5 p-3 rounded-md z-0'  >
        <div className=' w-[370px] h-[250px] mx-auto relative'>
            <img src={`${user.user.image}`} className=' w-[370px] h-[250px] z-10 ' ></img>
            <div className='bg-blue-500 h-[5rem] aspect-square rounded-full blur-2xl absolute right-40 -z-10'></div>
        </div>

        <div className='flex     justify-around  text-white'>
            <div className='flex flex-col p-3   w-[80%]   gap-2'>
                <p className='text-blue-100 font-bold text-2xl'>{user.user.firstname} {user.user.lastname}</p>
                 <p className='text-yellow-100'>{user.user.email}</p> 
            </div>

            <div className='flex   justify-center items-center'><button className='hover:bg-lime  border border-pure-greys-300 font-bold text-2xl   px-3 py-1 rounded-md active:scale-95  '   >Follow</button></div>
        </div>
    </div>
  ) 
}

export default UserCard