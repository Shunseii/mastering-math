import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateProblemInput = {
  data: Omit<Prisma.ProblemCreateArgs["data"], "course">
  courseId: number
}
export default async function createProblem({ data, courseId }: CreateProblemInput, ctx: Ctx) {
  ctx.session.authorize()

  const problem = await db.problem.create({
    data: {
      ...data,
      course: { connect: { id: courseId } },
      user: { connect: { id: ctx.session.userId } },
    },
  })

  return problem
}
