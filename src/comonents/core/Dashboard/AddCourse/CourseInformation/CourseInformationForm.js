import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
 
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"



import {
  addCourseDetails,

  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"

import { setCourse  } from "../../../../../slices/courseSlice"

import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"

import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()





  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])


  useEffect(() => {

    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }
     

    getCategories()
  }, [])





  //   handle next button click
  const onSubmit = async (data) => {


    const formData = new FormData()

    formData.append("courseName", data.courseTitle)

    formData.append("courseDescription", data.courseShortDesc)


    formData.append("category", data.courseCategory)
    // formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("video", data.lectureVideo[0]);
    setLoading(true)


    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }

    const result = await addCourseDetails(formData, token)

    console.log('CourseDetails', result);

    setLoading(false)
  }




  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>


      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>



      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>


      {/* Course Thumbnail Image */}
      <Upload
        name="thumbnail"
        label="thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        required={true}
      />

      {/* Lecture Video Upload */}
      <Upload
        name="lectureVideo"
        label="lectureVideo"
        errors={errors}
        register={register}
        required={true}
        setValue={setValue}
        video={true}

      />










      {/* Next Button */}
      <div className="flex justify-end gap-x-2">

   
          <button className="bg-caribbeangreen-200 py-2 px-4 rounded-md  flex justify-end gap-x-2 items-center hover:scale-95 transition-all duration-200" type="submit">Next <MdNavigateNext /></button>
          
     
      </div>
    </form>
  )
}