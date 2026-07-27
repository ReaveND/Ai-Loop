"use server"

import { signIn, signOut } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache"
import { createFeedback } from "@/lib/services/feedback"

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid credentials." }
    }
    throw error // Re-throw to allow Next.js redirects to work
  }
}

export async function logoutAction() {
  await signOut()
}

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  workspaceName: z.string().min(2),
  userName: z.string().min(2)
})

export async function signupAction(formData: FormData) {
  try {
    const data = signupSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      workspaceName: formData.get("workspaceName"),
      userName: formData.get("userName")
    })
    
    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) return { error: "Email already exists" }
    
    const passwordHash = await bcrypt.hash(data.password, 10)
    
    await prisma.$transaction(async (tx) => {
      const workspace = await tx.workspace.create({
        data: { name: data.workspaceName }
      })
      
      await tx.user.create({
        data: {
          email: data.email,
          name: data.userName,
          passwordHash,
          role: "ADMIN",
          workspaceId: workspace.id
        }
      })
    })
    
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) return { error: "Validation failed" }
    return { error: "An error occurred during signup" }
  }
}

const feedbackSchema = z.object({
  content: z.string().min(1),
  channel: z.string().min(1),
  customerLabel: z.string().optional(),
  sourceRef: z.string().optional(),
})

export async function createFeedbackAction(formData: FormData) {
  try {
    const data = feedbackSchema.parse({
      content: formData.get("content"),
      channel: formData.get("channel"),
      customerLabel: formData.get("customerLabel") || undefined,
      sourceRef: formData.get("sourceRef") || undefined,
    })
    
    await createFeedback(data)
    revalidatePath("/feedback")
    return { success: true }
  } catch {
    return { error: "Failed to create feedback" }
  }
}
