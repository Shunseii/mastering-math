import { Suspense } from "react"
import { BlitzPage, Link, usePaginatedQuery, useRouter } from "blitz"
import getCourses from "app/courses/queries/getCourses"
import Navbar from "app/components/Navbar"
import { FaChevronRight } from "react-icons/fa"
import Layout from "app/layouts/Layout"

const ITEMS_PER_PAGE = 100

export const CoursesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ courses, hasMore }] = usePaginatedQuery(getCourses, {
    orderBy: { code: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div>
      <ul className="flex flex-col justify-between">
        {courses.map((course) => (
          <li className="flex flex-row ml-2 space-between" key={course.id}>
            <Link href={`/courses/${course.id}/problems`}>
              <a className="flex flex-row items-center">
                <span className="text-2xl font-bold">{course.code}</span>
                <span className="mx-4">—</span>
                <span className="text-xl font-semibold">{course.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const CoursesPage: BlitzPage = () => {
  return (
    <div>
      <main className="mx-96">
        <div className="flex flex-row items-center mb-4">
          <Link href="/">
            <a className="text-sm text-indigo-500">Home</a>
          </Link>
          <FaChevronRight className="mx-1 text-xs text-gray-400" />
          <span className="text-sm">Courses</span>
        </div>
        <h1 className="mb-4 text-3xl text-center">All Courses</h1>
        <hr className="mb-6" />
        <Suspense fallback={<div>Loading...</div>}>
          <CoursesList />
        </Suspense>
      </main>
    </div>
  )
}

CoursesPage.getLayout = (page) => <Layout title="Courses">{page}</Layout>

export default CoursesPage
