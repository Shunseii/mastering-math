import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetProblemInput = Pick<Prisma.FindFirstProblemArgs, "where">

export default async function getProblem({ where }: GetProblemInput, ctx: Ctx) {
  ctx.session.authorize()

  const problem = await db.problem.findFirst({ where })

  if (!problem) throw new NotFoundError()

  return problem
}
