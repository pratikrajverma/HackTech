import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast"

import { CiDark } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
 
import { useForm } from 'react-hook-form'
import { apiConnector } from '../services/apiconnector'
import { contactusEndpoint } from '../services/apis'




function ContactUs() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging Data", data);

        try { 
            setLoading(true);
            const toastId = toast.loading("Loading...")
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            toast.success("Message sent")
            console.log("Logging response  by backend", response);
            setLoading(false);
            toast.dismiss(toastId)
            // isSubmitSuccessful
        }
        catch (error) {
            console.log("Error:", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful]);





    const [lightbtn, setLightbtn] = useState(true);
    function darkhandler() {
        setLightbtn(true)
    }

    function lighthandler() {
        setLightbtn(false)
    }




    return (
        <div className={` ${lightbtn ? 'bg-richblack-300' : 'bg-black text-white'}   pl-5`} >

            <div className=' flex justify-end items-center gap-52 pr-40'>
                <h1 className='text-sky-500 font-semibold text-3xl py-5  flex justify-center h-full'>Feel free to Contact ...</h1>
                <div className=' bg-blue-300 bg-violet-400 w-[3rem] rounded-full p-[4px] ml-10 gap-2 flex justify-between'>


                    <button className={`w-5   rounded-full ${(lightbtn) ? 'bg-yellow-400 text-yellow-400scale-95' : 'text-black'} transition-all duration-500`}
                        onClick={darkhandler}>
                        <IoSunnyOutline /></button>
                    <button className={`w-5   rounded-full ${(lightbtn) ? 'text-white' : 'bg-black text-white'} transition-all duration-500`}
                        onClick={lighthandler}>
                        <CiDark /></button>
                </div>

            </div>
            <h2 className='text-xl pl-10 my-3 text-sky-500 font-semibold'>Contact Us</h2>
            <p className='text-[1.1rem] pl-10 pb-5 my-5'>For any queries, suggestions, or collaborations, please use the form below:</p>

            <form onSubmit={handleSubmit(submitContactForm)} >

                <div className='grid grid-cols-2 gap-5 pl-10'>
                    <div  >

                        <input className='w-[90%] h-[3rem] px-5 rounded-md text-black  border-b-[4px]   border-yellow-200'
                            placeholder='firstname' type="text" id="firstname" name="firstname"
                            {...register('firstname', { required: true })} />

                        {
                            errors.firstname && <p className='text-red-500'>{errors.firstname.message}</p>
                        }

                    </div>

                    <div  >

                        <input className='w-[90%] h-[3rem] px-5 rounded-md text-black  border-b-[4px]   border-yellow-200'
                            placeholder='lastname' type="text" id="lastname" name="lastname"
                            {...register('lastname')} />
                    </div>

                    <div  >

                        <input className=' w-[90%] h-[3rem] px-5 rounded-md text-black   border-b-[4px]  border-yellow-200  '
                            placeholder='Enter your Email' type="email" id="email" name="email"
                            {...register('email', { required: true })} />

                        {
                            errors.email && <p className='text-red-500'>{errors.email.message}</p>
                        }
                    </div>

                    <div >

                        <input className=' w-[90%] h-[3rem] px-5 rounded-md text-black   border-b-[4px]  border-yellow-200'
                            placeholder='Phone Number' type="tel" id="phoneNo" name="phoneNo" pattern="[0-9]{10}"
                            {...register('phoneNo', { required: true })} />

                        {
                            errors.phoneNo && <p className='text-red-500'>{errors.phoneNo.message}</p>
                        }
                    </div>

                </div>



                <div className="form-group px-10">

                    <textarea className='w-[98%] pt-5 mt-6 px-5  rounded-md   text-black  border-b-[4px] border-purple-600  border-yellow-200'
                        placeholder='Message' id="message" name="message"
                        {...register('message', { required: true })} />

                    {
                        errors.message && <p className='text-red-500'>{errors.message.message}</p>
                    }


                </div>




                <div className='flex justify-end my-7 pr-16'>

                    <button type='submit'
                        className='rounded-md bg-yellow-50 text-center px-6 py-2 text-[16px] font-semibold text-black hover:scale-95 transition-all duration-200'>
                        Send Message
                    </button>
                </div>



            </form> 

            <div className='bg-black text-white mt-20 p-5 -ml-5'>
                <table>
                    <tr>
                        <td className='pr-40'>Founder : </td>
                        <td><h1>Pratik Raj Verma</h1></td>
                    </tr>

                    <tr>
                        <td>Mobile Number : </td>

                        <td><a href="whatsapp://send?phone=+917765905199">+91 77659 05199</a></td>
                    </tr>
                    <tr>
                        <td>Email : </td>

                        <td><a href='mailto:hacktech.startup@gmail.com'>hacktech.startup@gmail.com</a>  </td>
                    </tr>


                    <br></br>




                </table>

            </div>
        </div>
    );
}

export default ContactUs;
