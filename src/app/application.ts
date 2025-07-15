/** @notice library imports */
import "reflect-metadata";
import { Hono } from "hono";

/// Local imports
import { handlers } from "@/handlers";
import { todoRouter } from "@/router/todo.router";
import { authRouter } from "@/router/auth.router";
import { ApplicationRoutes } from "@/enums/router.enum";
import { cors } from "hono/cors";

/// Core app
const app = new Hono({ strict: false });

// CORS配置
app.use('*', cors({
  origin: ['http://localhost:4001', 'http://localhost:4002'], // 前端和后台地址
  credentials: true
}))


/// Routers
app.route(ApplicationRoutes.TODOS, todoRouter);
app.route(ApplicationRoutes.AUTH, authRouter);

/// Global handlers
app.onError(handlers.onErrorHandler);
app.notFound(handlers.onNotFoundHandler);

export default app;
