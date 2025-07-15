import { Context, Next } from 'hono'
import { verifyToken } from '@/utils/auth'
import { Logger } from '@/config/logger'

export const authMiddleware = async (
  c: Context,
  next: Next
) => {
  try {
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

    // 将用户ID设置到上下文中
    c.set('user_id', decoded.userId)
    
    Logger.info(`AuthMiddleware - User ${decoded.userId} authenticated`)
    
    await next()
  } catch (error) {
    Logger.error('AuthMiddleware - Error:', error)
    return c.json(
      { success: false, error: 'Unauthorized - Token verification failed' },
      401
    )
  }
}