import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Videos
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>

        {/* Course Upload Tips */}
        
      </div>
    </>
  )
}