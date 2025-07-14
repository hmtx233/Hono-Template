# 认证中间件使用指南

## 概述

本项目使用JWT（JSON Web Token）进行用户认证。我们实现了一个智能的认证中间件，它能够自动排除登录和注册路由，同时保护其他所有API路由，确保只有经过认证的用户才能访问。

## 中间件实现

### 1. 认证中间件 (auth.middleware.ts)

这个中间件负责验证JWT令牌，并将用户ID添加到请求上下文中：

```typescript
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
```

### 2. 排除路由中间件 (exclude-auth.middleware.ts)

这个中间件负责排除登录和注册路由，使它们不需要认证即可访问：

```typescript
// 排除特定路由的认证中间件
export const excludeAuthMiddleware = async (
  c: Context,
  next: Next
) => {
  // 获取当前请求路径和方法
  const path = c.req.path
  const method = c.req.method
  
  // 检查是否是登录或注册请求
  // 注意：由于路由挂载方式，我们需要检查路径的结尾部分
  const isLoginRequest = path.endsWith(UsersRoutes.Login) && method === 'POST'
  const isRegisterRequest = path.endsWith(UsersRoutes.Register) && method === 'POST'
  
  // 如果是登录或注册请求，直接放行
  if (isLoginRequest || isRegisterRequest) {
    // 对于登录和注册路由，直接放行
    return next()
  }
  
  // 对其他路由应用认证中间件
  return authMiddleware(c, next)
}
```

## 使用方法

在路由文件中，只需要添加`excludeAuthMiddleware`中间件即可：

```typescript
// 在todo.router.ts和auth.router.ts中
.use("*", excludeAuthMiddleware)
```

这样，登录和注册路由将自动被排除，不需要认证即可访问，而其他所有路由都将受到保护，需要有效的JWT令牌才能访问。

## 认证流程

1. 用户通过`/api/register`注册新账户
2. 用户通过`/api/login`登录并获取JWT令牌
3. 用户在后续请求中，在请求头中添加`Authorization: Bearer <token>`
4. 中间件验证令牌，如果有效，则允许访问；如果无效，则返回401错误

## 注意事项

- 确保在所有需要保护的路由中都添加了`excludeAuthMiddleware`中间件
- 令牌有效期为1天，过期后需要重新登录
- 在前端应用中，应当妥善保存JWT令牌，并在每次请求中添加到请求头中