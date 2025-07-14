import { Context, Next } from 'hono'
import { verifyToken } from '@/utils/auth'

export type AuthVariables = {
  userId: number
}

// 认证中间件
export const authMiddleware = async (
  c: Context<{ Variables: AuthVariables }>,
  next: Next
) => {
  // 从请求头中获取 Authorization
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json(
      { success: false, error: 'Unauthorized - No token provided' },
      401
    )
  }

  // 提取 token
  const token = authHeader.split(' ')[1]
  
  // 验证 token
  const decoded = verifyToken(token)
  
  if (!decoded) {
    return c.json(
      { success: false, error: 'Unauthorized - Invalid token' },
      401
    )
  }

  // 将用户 ID 添加到上下文中
  c.set('userId', decoded.userId)
  
  await next()
}