import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateSolutionInput = {
  where: Prisma.SolutionUpdateArgs["where"]
  data: Omit<Prisma.SolutionUpdateArgs["data"], "problem">
  problemId: number
}

export default async function updateSolution({ where, data }: UpdateSolutionInput, ctx: Ctx) {
  ctx.session.authorize()

  // Don't allow updating
  delete (data as any).problem

  const solution = await db.solution.update({ where, data })

  return solution
}
