import { Context } from 'hono'
import { AuthService } from '@/services/auth.service'
import { registerSchema, loginSchema } from '@/validator/auth.validator'

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(ctx: Context) {
    try {
      // 验证请求体
      const userData = await registerSchema.parseAsync(await ctx.req.json())

      // 调用服务
      const result = await this.authService.register(userData)

      // 返回响应
      return ctx.json({ success: true, token: result.token }, 201)
    } catch (error: Error | any) {
      if (error.message === 'Email already exists') {
        return ctx.json({ success: false, error: 'Email already exists' }, 400)
      }
      return ctx.json({ success: false, error: error.message }, 400)
    }
  }

  async login(ctx: Context) {
    try {
      // 验证请求体
      const loginData = await loginSchema.parseAsync(await ctx.req.json())

      // 调用服务
      const result = await this.authService.login(loginData)

      // 返回响应
      return ctx.json({ success: true, token: result.token }, 200)
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return ctx.json({ success: false, error: 'Invalid credentials' }, 401)
      }
      return ctx.json({ success: false, error: error.message }, 400)
    }
  }
}
