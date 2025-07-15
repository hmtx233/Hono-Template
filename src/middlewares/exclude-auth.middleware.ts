import { Context, Next } from 'hono'
import { UsersRoutes } from '@/enums/router.enum'
import { authMiddleware } from './auth.middleware'
import { Logger } from '@/config/logger'

// 排除特定路由的认证中间件
export const excludeAuthMiddleware = async (
  c: Context,
  next: Next
) => {
  // 获取当前请求路径和方法
  const path = c.req.path
  const method = c.req.method
  Logger.info(`ExcludeAuthMiddleware - Checking path: ${path}, method: ${method}`)
  
  // 检查是否是登录或注册请求
  const isLoginRequest = path.endsWith(UsersRoutes.Login) && method === 'POST'
  const isRegisterRequest = path.endsWith(UsersRoutes.Register) && method === 'POST'
  
  Logger.info(`ExcludeAuthMiddleware - isLoginRequest: ${isLoginRequest}, isRegisterRequest: ${isRegisterRequest}`)
  
  // 如果是登录或注册请求，直接放行
  if (isLoginRequest || isRegisterRequest) {
    Logger.info(`ExcludeAuthMiddleware - Excluding auth for path: ${path}`)
    return next()
  }
  
  // 对其他路由应用认证中间件
  Logger.info(`ExcludeAuthMiddleware - Applying auth middleware for path: ${path}`)
  return authMiddleware(c, next)
}
