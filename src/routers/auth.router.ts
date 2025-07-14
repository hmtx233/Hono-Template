import { Hono } from 'hono'
import { AuthController } from '@/controllers/auth.controller'

export const createAuthRouter = (authController: AuthController) => {
  const router = new Hono()

  /**
   * @openapi
   * /api/auth/register:
   *   post:
   *     summary: 注册新用户
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 minLength: 3
   *                 maxLength: 50
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 minLength: 8
   *                 maxLength: 100
   *     responses:
   *       201:
   *         description: 用户注册成功
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 token:
   *                   type: string
   */
  router.post('/register', (ctx) => authController.register(ctx))

  /**
   * @openapi
   * /api/auth/login:
   *   post:
   *     summary: 用户登录
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 minLength: 8
   *                 maxLength: 100
   *     responses:
   *       200:
   *         description: 登录成功
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 token:
   *                   type: string
   *       401:
   *         description: 凭证无效
   */
  router.post('/login', (ctx) => authController.login(ctx))

  return router
}
