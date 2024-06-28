import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex lg:flex-row flex-col lg:items-center items-end lg:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 lg:p-8 p-2  lg:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstname}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="     mr-3 lg:w-fit w-32 h-fit overflow-x-auto ">
            <p className="lg:text-lg font-semibold text-richblack-5">
              {user?.firstname + " " + user?.lastname}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>


      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between gap-x-10">
          <p className="text-lg font-semibold   text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionDetails.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionDetails.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between gap-x-3">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 p-2 text-sm text-richblack-100">First Name</p> 
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstname}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-400">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-400">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionDetails.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-400">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionDetails.dateOfBirth) &&
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}