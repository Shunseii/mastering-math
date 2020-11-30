import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateProblemInput = {
  where: Prisma.ProblemUpdateArgs["where"]
  data: Omit<Prisma.ProblemUpdateArgs["data"], "course">
}

export default async function updateProblem({ where, data }: UpdateProblemInput, ctx: Ctx) {
  ctx.session.authorize()

  // Don't allow updating
  delete (data as any).course

  const problem = await db.problem.update({ where, data })

  return problem
}
