import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetUserInput = Pick<Prisma.FindFirstProblemArgs, "where">

export default async function getUser({ where }: GetUserInput, ctx: Ctx) {
  ctx.session.authorize()

  const user = await db.user.findFirst({
    where,
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}
