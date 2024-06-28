import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import Upload from "../Upload";

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };
    getCategories();
  }, []);

  const onSubmit = async (data) => {
    setFormSubmitting(true);
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("category", data.courseCategory);
    formData.append("thumbnail", data.thumbnail);
    formData.append("video", data.lectureVideo);

    try {
      const result = await addCourseDetails(formData, token);
      if(result)
      {
        console.log("CourseDetails", result);
        toast.success("Course details added successfully!");
        dispatch(setCourse(result));
      }
    }
    catch (error) {
    toast.error("Failed to add course details.");
    console.error("Error adding course details:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 w-[90%]"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2  ">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Video Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Video title is required
          </span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Video Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Video Description is required
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Video Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
          disabled={loading}
        >
          <option value="" disabled>
            {loading ? "Loading categories..." : "Choose a Category"}
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
        label="Thumbnail"
        errors={errors}
        register={register}
        required={true}
        setValue={setValue}
      />

      {/* Lecture Video Upload */}
      <Upload
        name="lectureVideo"
        label="Lecture Video"
        errors={errors}
        register={register}
        required={true}
        setValue={setValue}
        video={true}
      />

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        <button
          className="bg-caribbeangreen-200 py-2 px-4 rounded-md flex justify-end gap-x-2 items-center hover:scale-95 transition-all duration-200"
          type="submit"
          disabled={formSubmitting}
        >
          {formSubmitting ? "Submitting..." : "Next"}
          <MdNavigateNext />
        </button>
      </div>
    </form>
  );
}
