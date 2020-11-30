import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteSolutionInput = Pick<Prisma.SolutionDeleteArgs, "where">

export default async function deleteSolution({ where }: DeleteSolutionInput, ctx: Ctx) {
  ctx.session.authorize()

  const solution = await db.solution.delete({ where })

  return solution
}
