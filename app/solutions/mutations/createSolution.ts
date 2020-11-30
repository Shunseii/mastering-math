import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateSolutionInput = {
  data: Omit<Prisma.SolutionCreateArgs["data"], "problem">
  problemId: number
}
export default async function createSolution({ data, problemId }: CreateSolutionInput, ctx: Ctx) {
  ctx.session.authorize()

  const solution = await db.solution.create({
    data: {
      ...data,
      problem: { connect: { id: problemId } },
      user: { connect: { id: ctx.session.userId } },
    },
  })

  return solution
}
