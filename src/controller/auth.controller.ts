import { Context } from 'hono'
import { AuthService } from '@/service/auth.service'
import { registerSchema, loginSchema, updateProfileSchema } from '@/validator/auth.validator'

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

  // 添加获取用户信息的方法
  async getProfile(ctx: Context) {
    try {
      const userId = ctx.get('user_id')
      
      if (!userId) {
        return ctx.json({ success: false, error: 'User not authenticated' }, 401)
      }

      const userProfile = await this.authService.getUserProfile(userId)
      
      if (!userProfile) {
        return ctx.json({ success: false, error: 'User not found' }, 404)
      }

      return ctx.json({ 
        success: true, 
        data: userProfile 
      }, 200)
    } catch (error: any) {
      return ctx.json({ success: false, error: error.message }, 500)
    }
  }

  // 添加更新用户信息的方法
  async updateProfile(ctx: Context) {
    try {
      const userId = ctx.get('user_id')
      
      if (!userId) {
        return ctx.json({ success: false, error: 'User not authenticated' }, 401)
      }

      // 验证请求体
      const updateData = await updateProfileSchema.parseAsync(await ctx.req.json())

      // 调用服务更新用户信息
      const updatedProfile = await this.authService.updateUserProfile(userId, updateData)
      
      if (!updatedProfile) {
        return ctx.json({ success: false, error: 'Failed to update profile' }, 500)
      }

      return ctx.json({ 
        success: true, 
        message: 'Profile updated successfully',
        data: updatedProfile 
      }, 200)
    } catch (error: any) {
      if (error.message === 'User not found') {
        return ctx.json({ success: false, error: 'User not found' }, 404)
      }
      if (error.message === 'Email already exists') {
        return ctx.json({ success: false, error: 'Email already exists' }, 400)
      }
      return ctx.json({ success: false, error: error.message }, 400)
    }
  }
}
