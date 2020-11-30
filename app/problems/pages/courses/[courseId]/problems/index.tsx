import { Suspense } from "react"
import { Link, usePaginatedQuery, useRouter, useParam, useQuery, BlitzPage } from "blitz"
import getProblems from "app/problems/queries/getProblems"
import getCourse from "app/courses/queries/getCourse"
import { FaChevronRight } from "react-icons/fa"
import getUsers from "app/users/queries/getUsers"
import Layout from "app/layouts/Layout"

const ITEMS_PER_PAGE = 100

type ClassNameProps = {
  className?: string
}

export const Breadcrumbs = ({ className }: ClassNameProps) => {
  const courseId = useParam("courseId", "number")
  const [course] = useQuery(getCourse, { where: { id: courseId } })

  return (
    <div className={`${className} flex flex-row items-center`}>
      <Link href="/">
        <a className="text-sm text-indigo-500">Home</a>
      </Link>
      <FaChevronRight className="mx-1 text-xs text-gray-400" />
      <Link href="/courses">
        <a className="text-sm text-indigo-500">Courses</a>
      </Link>
      <FaChevronRight className="mx-1 text-xs text-gray-400" />
      <span className="text-sm">{course.code}</span>
    </div>
  )
}

export const CourseHeader = ({ className }: ClassNameProps) => {
  const courseId = useParam("courseId", "number")
  const [course] = useQuery(getCourse, { where: { id: courseId } })

  return (
    <div className={`${className} flex flex-row justify-between items-center`}>
      <h1 className="flex flex-row items-center">
        <span className="text-2xl font-bold">{course.code}</span>
        <span className="mx-3">—</span>
        <span className="text-2xl font-semibold">{course.name}</span>
      </h1>
      <p>
        <Link href={`/courses/${courseId}/problems/new`}>
          <a className="px-2 py-1 font-semibold text-white transition duration-200 ease-in-out bg-green-500 border-2 border-green-500 rounded hover:bg-white hover:text-green-500">
            New Problem
          </a>
        </Link>
      </p>
    </div>
  )
}

export const ProblemsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const courseId = useParam("courseId", "number")
  const [{ users }] = useQuery(getUsers, {})
  const [{ problems, hasMore }] = usePaginatedQuery(getProblems, {
    where: { course: { id: courseId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div className="flex flex-col">
      {problems.map((problem) => {
        const user = users.find((elem) => elem.id === problem.userId)

        return (
          <p className="flex flex-row items-center" key={problem.id}>
            <Link href={`/courses/${courseId}/problems/${problem.id}`}>
              <a className="text-xl font-semibold">{problem.name}</a>
            </Link>
            <span className="mx-3">—</span>
            <span className="text-sm">Submitted by: {user?.name ? user.name : user?.email}</span>
          </p>
        )
      })}
    </div>
  )
}

const ProblemsPage: BlitzPage = () => {
  return (
    <div>
      <main className="mx-96">
        <Suspense fallback={<div>Loading...</div>}>
          <Breadcrumbs className="mb-4" />
          <CourseHeader className="mb-4" />
          <hr className="mb-6" />
          <ProblemsList />
        </Suspense>
      </main>
    </div>
  )
}

ProblemsPage.getLayout = (page) => <Layout title="Problems">{page}</Layout>

export default ProblemsPage
