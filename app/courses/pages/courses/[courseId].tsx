import { Suspense } from "react"
import { useRouter, useQuery, useParam } from "blitz"
import getCourse from "app/courses/queries/getCourse"

export const Course = () => {
  const router = useRouter()
  const courseId = useParam("courseId", "number")
  const [course] = useQuery(getCourse, { where: { id: courseId } })

  router.push(`/courses/${course.id}/problems`)

  return (
    <div>
      <h1>Course {course.id}</h1>
      <pre>{JSON.stringify(course, null, 2)}</pre>
    </div>
  )
}

const ShowCoursePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Course />
      </Suspense>
    </div>
  )
}

export default ShowCoursePage
