import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../services/operations/profileAPI'
import UserCard from './UserCard'

import locatemeLogo from '../../../assets/Logo/location.png'
import { IoSearch } from "react-icons/io5";

import toast from 'react-hot-toast'


const AllPeers = () => {

  const [animate, setAnimate] = useState(false);

  useEffect(() => {

    const interval = setInterval(() => {
      setAnimate(!animate);
      setTimeout(() => {
        setAnimate(false);
      }, 1000); // Duration of scaleIn animation
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, []);



  const [pincode, setPincode] = useState('')
  const [filterUsers, setfilterUsers] = useState([])

  const enterPincode = (e) => {
    setPincode(e.target.value)

  }


  






  const [users, setUsers] = useState([])
 

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUsers();
      console.log('all peers data : ', response);
      setUsers(response)
    }

    getUsers();
  }, [])




  const pincodeHandler = () => {

    const filterUsers = users.filter((user) => user.pincode === pincode);

    if (filterUsers.length === 0) {
      toast.error('No Peers found at this pincode...')

    }

    setfilterUsers(filterUsers)

  }


  return (
    <div>
      {/* search bar */}
      <div className=' flex justify-center mb-20 mt-10  items-center gap-3'>

        <div className='flex justify-end'><img src={locatemeLogo} className={`  h-16 cursor-pointer active:scale-95 ${animate ? 'animate-ping' : 'animate-none'} `}></img> </div>

        <input className='h-12 w-80 rounded-lg bg-richblack-700 placeholder:text-xl  m-5 p-4 text-white font-semibold  '
          placeholder='Enter your pin code...' type='text'
          onChange={enterPincode}
        />
        <IoSearch className='text-white text-3xl cursor-pointer
                        hover:text-caribbeangreen-300 active:scale-90  '
          onClick={pincodeHandler} />

      </div>


      <div className='mb-20'><p className='text-pure-greys-25 font-bold text-3xl pl-10'>Hi... Let's Connect with peers</p></div>

      <div className='flex border flex-wrap w-11/12 mx-auto gap-10 '>
        {
          filterUsers.length > 0 ? (
              filterUsers.map((user, index) => (
                <UserCard key={index} user={user} />
              ))
            ) : users.length > 0 ? (

              users.map((user, index) => (

                <UserCard key={index} user={user} />
              ))
            ) : (
              <p className='text-white font-bold text-2xl text-center'>No Peers found right now....</p>
            )

        }  
      </div>
    </div>
  )
}

export default AllPeers