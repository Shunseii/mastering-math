import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getProblem from "app/problems/queries/getProblem"
import deleteProblem from "app/problems/mutations/deleteProblem"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import SolutionForm from "app/solutions/components/SolutionForm"
import createSolution from "app/solutions/mutations/createSolution"
import updateSolution from "app/solutions/mutations/updateSolution"
import getSolution from "app/solutions/queries/getSolution"
import getSolutions from "app/solutions/queries/getSolutions"
import getUsers from "app/users/queries/getUsers"
import getUser from "app/users/queries/getUser"
import getCourse from "app/courses/queries/getCourse"
import SolutionGradeForm from "app/solutions/components/SolutionGradeForm"
import { FaChevronRight } from "react-icons/fa"

import Latex from "react-latex"

type UserSolutionProps = {
  currentUserId: number
  problemId: number
}

export const UserSolution = ({ currentUserId, problemId }: UserSolutionProps) => {
  const [createSolutionMutation] = useMutation(createSolution)

  try {
    const [solution] = useQuery(getSolution, { where: { problemId, userId: currentUserId } })

    return (
      <div>
        <p className="mb-4 text-lg font-semibold">My Solution</p>
        {solution.graded ? (
          <>
            <p className="mb-4">
              <span className="font-semibold">Status:</span>{" "}
              <span className="px-2 py-1 text-sm font-bold text-green-600 bg-white border border-green-600 rounded">
                Graded
              </span>
            </p>
            <p>
              <span className="mr-2 font-semibold">Grade:</span>
              <span className="text-xl font-semibold">{solution.grade}%</span>
            </p>
            <p className="mb-4">
              <span className="mr-2 font-semibold">Feedback:</span>
              <span className="">
                <Latex>{solution.feedback}</Latex>
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">
              <span className="font-semibold">Status:</span>{" "}
              <span className="px-2 py-1 text-sm font-bold text-red-600 bg-white border border-red-600 rounded">
                Not Graded
              </span>
            </p>
          </>
        )}
        <p className="px-4 py-4 mb-4 bg-gray-100 border border-gray-200 rounded-lg bg-opacity-40">
          <Latex>{solution.body}</Latex>
        </p>
      </div>
    )
  } catch (err) {
    return (
      <div>
        <p className="mb-4 text-lg font-semibold">My Solution</p>

        <p className="mb-4">
          <span className="font-semibold">Status:</span>{" "}
          <span className="px-2 py-1 text-sm font-bold text-yellow-600 bg-white border border-yellow-600 rounded">
            In Progress
          </span>
        </p>
        <SolutionForm
          initialValues={{}}
          onSubmit={async (event) => {
            try {
              await createSolutionMutation({
                data: { body: event.target[1].value },
                problemId,
              })
              window.location.reload()
            } catch (error) {
              alert("Error creating solution " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </div>
    )
  }
}

type AllSolutionsProps = {
  problemId: number
}

export const AllSolutions = ({ problemId }: AllSolutionsProps) => {
  const [{ solutions }] = useQuery(getSolutions, { where: { problemId } })
  const [{ users }] = useQuery(getUsers, {})
  const [updateSolutionMutation] = useMutation(updateSolution)

  return (
    <ul>
      {solutions.map((solution) => {
        return users.map((user) => {
          if (user.id === solution.userId) {
            return (
              <li className="px-4 py-2 mb-4 border border-gray-200 rounded" key={solution.id}>
                {!solution.graded ? (
                  <div className="mb-3">
                    <p className="flex flex-col">
                      <span className="mb-1 text-lg font-semibold">
                        {user.name ? user.name : user.email}'s solution:
                      </span>
                      <span className="px-2 py-1 mb-2 bg-gray-100 border border-gray-200 rounded bg-opacity-40">
                        <Latex>{solution.body}</Latex>
                      </span>
                    </p>
                    <SolutionGradeForm
                      initialValues={{}}
                      onSubmit={async (event) => {
                        try {
                          await updateSolutionMutation({
                            where: { id: solution.id },
                            data: {
                              body: solution.body,
                              graded: true,
                              grade: Number(event.target[0].value),
                              feedback: event.target[1].value,
                            },
                            problemId,
                          })
                          window.location.reload()
                        } catch (error) {
                          alert("Error grading solution " + JSON.stringify(error, null, 2))
                        }
                      }}
                    />
                  </div>
                ) : (
                  <p className="flex flex-col mb-2">
                    <span className="mb-1 text-lg font-semibold">
                      {user.name ? user.name : user.email}'s solution:
                    </span>
                    <span className="px-2 py-1 mb-2 bg-gray-100 border border-gray-200 rounded bg-opacity-40">
                      <Latex>{solution.body}</Latex>
                    </span>
                    <span>
                      <span className="mr-2 text-lg font-semibold">Grade:</span>
                      <span className="text-lg font-bold">{solution.grade}%</span>
                    </span>
                    <span>
                      <span className="mr-2 text-lg font-semibold">Feedback:</span>
                      <span>
                        <Latex>{solution.feedback}</Latex>
                      </span>
                    </span>
                  </p>
                )}
              </li>
            )
          }
        })
      })}
    </ul>
  )
}

export const Problem = () => {
  const router = useRouter()
  const problemId = useParam("problemId", "number") as number
  const courseId = useParam("courseId", "number")
  const [problem] = useQuery(getProblem, { where: { id: problemId } })
  const [deleteProblemMutation] = useMutation(deleteProblem)
  const currentUser = useCurrentUser()
  const [user] = useQuery(getUser, { where: { id: problem.userId as number } })

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="flex flex-row items-end mb-4">
          <span className="text-2xl font-semibold">{problem.name}</span>
          <span className="px-2 py-1 ml-4 text-sm font-normal text-gray-800 bg-gray-200 rounded">
            Submitted by {user?.name ? user.name : user?.email}
          </span>
        </h1>
        {currentUser?.id === problem.userId ? (
          <div>
            <Link href={`/courses/${courseId}/problems/${problem.id}/edit`}>
              <a className="px-2 py-1 mr-2 font-semibold text-white transition duration-200 ease-in-out bg-yellow-500 border-2 border-yellow-500 rounded hover:bg-white hover:text-yellow-500">
                Edit
              </a>
            </Link>

            <button
              className="px-2 py-1 mr-2 font-semibold text-white transition duration-200 ease-in-out bg-red-500 border border-red-500 rounded hover:bg-white hover:text-red-500"
              type="button"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteProblemMutation({ where: { id: problem.id } })
                  router.push(`/courses/${courseId}/problems`)
                }
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr className="mb-6" />
      <p className="px-4 py-4 mb-6 bg-gray-100 border border-gray-200 rounded-lg bg-opacity-40">
        <Latex>{problem.body}</Latex>
      </p>
      <hr className="mb-6" />

      {currentUser?.id === problem.userId ? (
        <>
          <h3 className="mb-2 text-lg font-semibold">All User Solutions</h3>
          <hr className="mb-2" />
          <AllSolutions problemId={problemId} />
        </>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <UserSolution currentUserId={currentUser?.id as number} problemId={problemId} />
          </div>
        </Suspense>
      )}
    </div>
  )
}

type ClassNameProps = {
  className?: string
}

export const Breadcrumbs = ({ className }: ClassNameProps) => {
  const courseId = useParam("courseId", "number")
  const [course] = useQuery(getCourse, { where: { id: courseId } })
  const problemId = useParam("problemId", "number") as number
  const [problem] = useQuery(getProblem, { where: { id: problemId } })

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
      <span className="text-sm">{problem.name}</span>
    </div>
  )
}

const ShowProblemPage: BlitzPage = () => {
  return (
    <main className="mx-96">
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumbs className="mb-4" />
        <Problem />
      </Suspense>
    </main>
  )
}

ShowProblemPage.getLayout = (page) => <Layout title={"Problem"}>{page}</Layout>

export default ShowProblemPage
