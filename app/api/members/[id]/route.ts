import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateRoleSchema = z.object({
  role: z.enum(["ADMIN", "ANALYST", "VIEWER"])
})

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin()
    const body = await request.json()
    const { role } = updateRoleSchema.parse(body)

    const member = await prisma.user.findUnique({
      where: { id: params.id }
    })

    if (!member || member.workspaceId !== user.workspaceId) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    return NextResponse.json({ success: true, member: updated })
  } catch (error: unknown) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Forbidden" ? 403 : 401 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin()
    
    // Prevent an admin from deleting themselves
    if (params.id === user.id) {
      return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 })
    }

    const member = await prisma.user.findUnique({
      where: { id: params.id }
    })

    if (!member || member.workspaceId !== user.workspaceId) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    await prisma.user.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Forbidden" ? 403 : 401 })
    }
    return NextResponse.json({ error: "Failed to remove member" }, { status: 500 })
  }
}
