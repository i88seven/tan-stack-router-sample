import { z } from 'zod'

export type User = {
  email: string
  username: string
}

export type Token = {
  refresh: string
  access: string
}

export const loginFormSchema = z.object({
  email: z.string().email().min(1),
})
export const loginRequestSchema = loginFormSchema
