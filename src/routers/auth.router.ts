import { Hono } from 'hono'
import { UsersRoutes } from "@/enums/router.enum";
import { injectAuthDependenciesMiddleware } from "@/middlewares/auth.di";
import { Logger } from "@/config/logger";
import { excludeAuthMiddleware } from "@/middlewares/exclude-auth.middleware";
import { AuthVariables } from "@/middlewares/auth.middleware";


export const authRouter = new Hono<{
  Variables: AuthVariables;
}>(
{
  strict: false,
})

  /// 添加日志中间件，记录请求路径
  .use("*", async (c, next) => {
    Logger.info(`Auth Router - Request path: ${c.req.path}`)
    await next()
  })

  /// Dependency injection
  .use("*", injectAuthDependenciesMiddleware)
  
  /// 添加认证中间件（会自动排除登录和注册路由）
  .use("*", excludeAuthMiddleware)

  .post(UsersRoutes.Register, (c) => {
    Logger.info(`Processing register request at ${c.req.path}`)
    return c.get("authController").register(c)
  })
  .post(UsersRoutes.Login, (c) => {
    Logger.info(`Processing login request at ${c.req.path}`)
    return c.get("authController").login(c)
  });
