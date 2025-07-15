/** @notice library imports */
import { createMiddleware } from "hono/factory";
import { Pool } from 'pg';
/// local imports
import { AuthRepository } from "@/repository/auth.repository";
import { AuthService } from "@/service/auth.service";
import { AuthController } from "@/controller/auth.controller";

import { TodoService } from "@/service/todo.service";
import { TodoController } from "@/controller/todo.controller";
import { TodoRepository } from "@/repository/todo.repository";

import { Environments } from "@/config/environments";

/// Variable type
export type Variables = {
  authController: AuthController;
  todoController: TodoController;
  user_id: number; // Assuming userId is a number, adjust as necessary
};

/// Dependencies
const pool = new Pool({
  connectionString: Environments.DATABASE_URL
});

// auth dependencies
const authRepository = new AuthRepository(pool);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

/// td dependencies
const todoRepository = new TodoRepository();
const todoServices = new TodoService(todoRepository);
const todoController = new TodoController(todoServices);

/// Dependency injection
export const injectDependenciesMiddleware = createMiddleware<{
  Variables: Variables;
}>(async (c, next) => {
  c.set("authController", authController);
  c.set("todoController", todoController);
  await next();
});
