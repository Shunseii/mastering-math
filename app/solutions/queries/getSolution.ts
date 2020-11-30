import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetSolutionInput = Pick<Prisma.FindFirstSolutionArgs, "where">

export default async function getSolution({ where }: GetSolutionInput, ctx: Ctx) {
  ctx.session.authorize()

  const solution = await db.solution.findFirst({ where })

  if (!solution) throw new NotFoundError()

  return solution
}
