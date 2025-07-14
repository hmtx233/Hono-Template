/** @notice library imports */
import { createMiddleware } from "hono/factory";
/// local imports
import { TodoServices } from "@/services/todo.services";
import { TodoController } from "@/controllers/todo.controller";

/// Variable type
export type Variables = {
  todoController: TodoController;
};

/// Dependencies
const todoServices = new TodoServices();
const todoController = new TodoController(todoServices);

/// Dependency injection
export const injectTodoDependenciesMiddleware = createMiddleware<{
  Variables: Variables;
}>(async (c, next) => {
  c.set("todoController", todoController);
  await next();
});
