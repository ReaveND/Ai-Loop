import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const createMemberSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "ANALYST", "VIEWER"])
})

export async function GET() {
  try {
    const user = await requireAdmin()
    const members = await prisma.user.findMany({
      where: { workspaceId: user.workspaceId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: { email: "asc" }
    })
    return NextResponse.json({ success: true, members })
  } catch (error: unknown) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Forbidden" ? 403 : 401 })
    }
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin()
    const body = await request.json()
    const data = createMemberSchema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(data.password, 10)

    const newMember = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role,
        workspaceId: user.workspaceId
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    return NextResponse.json({ success: true, member: newMember }, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Forbidden" ? 403 : 401 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid member data" }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 })
  }
}
