import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetProblemsInput = Pick<Prisma.FindManyProblemArgs, "where" | "orderBy" | "skip" | "take">

export default async function getProblems(
  { where, orderBy, skip = 0, take }: GetProblemsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const problems = await db.problem.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.problem.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    problems,
    nextPage,
    hasMore,
    count,
  }
}
