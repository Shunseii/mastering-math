import Layout from "app/layouts/Layout"
import { Link, useQuery, useRouter, useMutation, useParam, BlitzPage } from "blitz"
import createProblem from "app/problems/mutations/createProblem"
import ProblemForm from "app/problems/components/ProblemForm"
import getCourse from "app/courses/queries/getCourse"
import { Suspense } from "react"
import { FaChevronRight } from "react-icons/fa"

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
      <Link href={`/courses/${course.id}/problems`}>
        <a className="text-sm text-indigo-500">{course.code}</a>
      </Link>
      <FaChevronRight className="mx-1 text-xs text-gray-400" />
      <span className="text-sm">Create New Problem</span>
    </div>
  )
}

const NewProblem = () => {
  const router = useRouter()
  const courseId = useParam("courseId", "number") as number
  const [course] = useQuery(getCourse, { where: { id: courseId } })
  const [createProblemMutation] = useMutation(createProblem)

  return (
    <main className="flex-flex-col">
      <h1 className="mb-4 text-lg font-semibold">Create a New Problem for {course.code}</h1>

      <ProblemForm
        initialValues={{}}
        onSubmit={async (event) => {
          try {
            const problem = await createProblemMutation({
              data: { name: event.target[0].value, body: event.target[1].value },
              courseId,
            })
            router.push(`/courses/${courseId}/problems/${problem.id}`)
          } catch (error) {
            alert("Error creating problem " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </main>
  )
}

const NewProblemPage: BlitzPage = () => (
  <main className="mx-96">
    <Suspense fallback={"Loading..."}>
      <Breadcrumbs className="mb-4" />
      <NewProblem />
    </Suspense>
  </main>
)

NewProblemPage.getLayout = (page) => <Layout title={"Create New Problem"}>{page}</Layout>

export default NewProblemPage
