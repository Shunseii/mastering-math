import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetSolutionsInput = Pick<Prisma.FindManySolutionArgs, "where" | "orderBy" | "skip" | "take">

export default async function getSolutions(
  { where, orderBy, skip = 0, take }: GetSolutionsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const solutions = await db.solution.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.solution.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    solutions,
    nextPage,
    hasMore,
    count,
  }
}
