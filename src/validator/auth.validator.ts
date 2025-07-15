import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100)
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
})

// 添加更新用户信息的验证规则
export const updateProfileSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional()
}).refine(data => {
  // 至少需要提供一个字段进行更新
  return data.username !== undefined || data.email !== undefined || data.password !== undefined
}, {
  message: "至少需要提供一个字段进行更新"
})
