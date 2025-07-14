/** @notice library imports */
import { Hono } from "hono";
/// Local imports
import { TodosRoutes } from "@/enums/router.enum";
import { injectTodoDependenciesMiddleware } from "@/middlewares/todo.di";
import { excludeAuthMiddleware } from "@/middlewares/exclude-auth.middleware";
import { AuthVariables } from "@/middlewares/auth.middleware";

/// Todo router
export const todoRouter = new Hono<{
  Variables: AuthVariables;
}>({
  strict: false,
})
  /// Dependency injection
  .use("*", injectTodoDependenciesMiddleware)
  
  /// 添加认证中间件保护所有路由（排除登录和注册）
  .use("*", excludeAuthMiddleware)

  /// Create todo
  .post(TodosRoutes.CREATE, (c) => c.get("todoController").createTodo(c))

  /// Get todo by id
  .get(TodosRoutes.GET_BY_ID, async (c) => {
    const { id } = c.req.param();
    return await c.get("todoController").getTodoById(c, id);
  })

  /// Get todos
  .get(TodosRoutes.GET_ALL, async (c) => {
    return await c.get("todoController").getTodos(c);
  })

  /// Delete todo by id
  .delete(TodosRoutes.DELETE_BY_ID, async (c) => {
    const { id } = c.req.param();
    // 确保 id 是数字类型
    const todoId = Number(id);
    if (isNaN(todoId)) {
      return c.json({ error: "Invalid id" }, 400);
    }
    return await c.get("todoController").deleteTodoById(c, id);
  });
