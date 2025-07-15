import { Hono } from "hono";
import { TodosRoutes } from "@/enums/router.enum";
import { excludeAuthMiddleware } from "@/middlewares/exclude-auth.middleware";
import { Variables, injectDependenciesMiddleware } from "@/middlewares/deps.middleware";
import { Logger } from "@/config/logger";

export const todoRouter = new Hono<{
  Variables: Variables;
}>({
  strict: false,
})
  .use("*", injectDependenciesMiddleware)
  .use("*", excludeAuthMiddleware)

  // 分页路由必须放在参数路由之前
  .get(TodosRoutes.GET_PAGINATED, (c) => {
    Logger.info(`Processing paginated todos request`);
    return c.get("todoController").getAllTodosWithPagination(c);
  })
  .get(TodosRoutes.GET_USER_PAGINATED, (c) => {
    Logger.info(`Processing user paginated todos request`);
    return c.get("todoController").getUserTodosWithPagination(c);
  })
  
  // 原有路由
  .post(TodosRoutes.CREATE, (c) => {
    return c.get("todoController").createTodo(c);
  })
  .get(TodosRoutes.GET_ALL, (c) => {
    return c.get("todoController").getAllTodos(c);
  })
  .get(TodosRoutes.GET_BY_ID, (c) => {
    return c.get("todoController").getTodoById(c);
  })
  .delete(TodosRoutes.DELETE_BY_ID, (c) => {
    return c.get("todoController").deleteTodo(c);
  });
