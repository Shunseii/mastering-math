import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteProblemInput = Pick<Prisma.ProblemDeleteArgs, "where">

export default async function deleteProblem({ where }: DeleteProblemInput, ctx: Ctx) {
  ctx.session.authorize()

  // TODO: remove once Prisma supports cascading deletes
  await db.solution.deleteMany({ where: { problem: { id: where.id } } })

  const problem = await db.problem.delete({ where })

  return problem
}
