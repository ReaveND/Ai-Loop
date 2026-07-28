"use server"

import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/session"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { revalidatePath } from "next/cache"

type Role = "ADMIN" | "ANALYST" | "VIEWER"

const inviteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "ANALYST", "VIEWER"])
})

export async function inviteMemberAction(formData: FormData) {
  try {
    const user = await requireAdmin()

    const data = inviteSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role")
    })

    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) {
      return { error: "A user with this email already exists." }
    }

    const passwordHash = await bcrypt.hash(data.password, 10)

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role as Role,
        workspaceId: user.workspaceId
      }
    })

    revalidatePath("/members")
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return { error: "You do not have permission to manage members.", status: 403 }
    }
    if (error instanceof z.ZodError) {
      return { error: "Validation error: please check name, email, and password." }
    }
    return { error: "Failed to invite member." }
  }
}

export async function updateMemberRoleAction(userId: string, role: string) {
  try {
    const user = await requireAdmin()

    if (!["ADMIN", "ANALYST", "VIEWER"].includes(role)) {
      return { error: "Invalid role specified." }
    }

    const member = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!member || member.workspaceId !== user.workspaceId) {
      return { error: "Member not found or access denied." }
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: role as Role }
    })

    revalidatePath("/members")
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return { error: "You do not have permission to update roles.", status: 403 }
    }
    return { error: "Failed to update member role." }
  }
}

export async function deleteMemberAction(userId: string) {
  try {
    const user = await requireAdmin()

    if (userId === user.id) {
      return { error: "You cannot remove your own account." }
    }

    const member = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!member || member.workspaceId !== user.workspaceId) {
      return { error: "Member not found or access denied." }
    }

    await prisma.user.delete({
      where: { id: userId }
    })

    revalidatePath("/members")
    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return { error: "You do not have permission to remove members.", status: 403 }
    }
    return { error: "Failed to remove member." }
  }
}
