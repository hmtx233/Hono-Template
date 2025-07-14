/** @notice library imports */
import { createMiddleware } from "hono/factory";
/// local imports
import { TodoServices } from "@/services/todo.service";
import { TodoController } from "@/controllers/todo.controller";
import { TodoRepository } from "@/repository/todo.repository";
import { AuthVariables } from "./auth.middleware";

/// Variable type
export type TodoVariables = {
  todoController: TodoController;
};

/// Combined variables type
export type Variables = TodoVariables & AuthVariables;

/// Dependencies
const todoRepository = new TodoRepository();
const todoServices = new TodoServices(todoRepository);
const todoController = new TodoController(todoServices);

/// Dependency injection
export const injectTodoDependenciesMiddleware = createMiddleware<{
  Variables: Variables;
}>(async (c, next) => {
  c.set("todoController", todoController);
  await next();
});
