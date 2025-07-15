import { Context, Next } from 'hono'
import { UsersRoutes, API_PREFIX } from '@/enums/router.enum'
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
  
  // 检查是否是登录或注册请求 - 使用精确匹配
  const loginPath = `${API_PREFIX}${UsersRoutes.Login}`
  const registerPath = `${API_PREFIX}${UsersRoutes.Register}`
  
  const isLoginRequest = path === loginPath && method === 'POST'
  const isRegisterRequest = path === registerPath && method === 'POST'
  
  Logger.info(`ExcludeAuthMiddleware - loginPath: ${loginPath}, registerPath: ${registerPath}`)
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
