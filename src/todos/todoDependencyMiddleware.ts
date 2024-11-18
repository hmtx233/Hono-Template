/** @notice library imports */
import { createMiddleware } from "hono/factory";
/// local imports
import { Todo } from "./TodoEntity";
import { TodoServices } from "./TodoServices";
import { TodoController } from "./TodoController";
import { AppDataSource } from "@/config/database";

/// Variable type
export type Variables = {
  todoController: TodoController;
};

/// Dependencies
const todoRepo = AppDataSource.getRepository(Todo);
const todoServices = new TodoServices(todoRepo);
const todoController = new TodoController(todoServices);

/// Dependency injection
export const injectTodoControllerMiddleware = createMiddleware<{
  Variables: Variables;
}>(async (c, next) => {
  c.set("todoController", todoController);
  await next();
});
