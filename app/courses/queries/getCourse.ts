import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetCourseInput = Pick<Prisma.FindFirstCourseArgs, "where">

export default async function getCourse({ where }: GetCourseInput, ctx: Ctx) {
  ctx.session.authorize()

  const course = await db.course.findFirst({ where })

  if (!course) throw new NotFoundError()

  return course
}
