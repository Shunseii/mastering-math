import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetCoursesInput = Pick<Prisma.FindManyCourseArgs, "where" | "orderBy" | "skip" | "take">

export default async function getCourses(
  { where, orderBy, skip = 0, take }: GetCoursesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const courses = await db.course.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.course.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    courses,
    nextPage,
    hasMore,
    count,
  }
}
