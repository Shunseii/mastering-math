import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getProblem from "app/problems/queries/getProblem"
import updateProblem from "app/problems/mutations/updateProblem"
import ProblemForm from "app/problems/components/ProblemForm"

export const EditProblem = () => {
  const router = useRouter()
  const problemId = useParam("problemId", "number")
  const courseId = useParam("courseId", "number")
  const [problem, { setQueryData }] = useQuery(getProblem, { where: { id: problemId } })
  const [updateProblemMutation] = useMutation(updateProblem)

  return (
    <div>
      <h1>Edit Problem {problem.id}</h1>
      <pre>{JSON.stringify(problem)}</pre>

      <ProblemForm
        initialValues={problem}
        onSubmit={async (event) => {
          try {
            const updated = await updateProblemMutation({
              where: { id: problem.id },
              data: { name: event.target[0].value, body: event.target[1].value },
            })
            await setQueryData(updated)
            router.push(`/courses/${courseId}/problems/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating problem " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditProblemPage: BlitzPage = () => {
  const courseId = useParam("courseId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProblem />
      </Suspense>

      <p>
        <Link href={`/courses/${courseId}/problems`}>
          <a>Problems</a>
        </Link>
      </p>
    </div>
  )
}

EditProblemPage.getLayout = (page) => <Layout title={"Edit Problem"}>{page}</Layout>

export default EditProblemPage
