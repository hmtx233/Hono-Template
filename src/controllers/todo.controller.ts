/** @notice library imports */
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import type { ApiResponse } from "@/types/ApiResponse";

/// Local imports
import { TodoServices } from "../services/todo.services";
import { TodosRoutes } from "@/enums/router.enum";
import { Variables } from "@/middlewares/todo.di";
import { log } from "console";

export class TodoController {
  constructor(private todoService: TodoServices) {}

  async createTodo(c: Context<{ Variables: Variables }, TodosRoutes.CREATE>) {
    /// Grab fields
    const { description, isCompleted } = await c.req.json();
    log(
      "Creating todo with description:",
      description,
      "and isCompleted:",
      isCompleted,
    );
    /// Save into database
    const { id } = await this.todoService.create({ description, isCompleted });

    /// Response
    return c.json<ApiResponse<{ id: number }>>(
      {
        success: true,
        data: { id },
      },
      StatusCodes.CREATED,
    );
  }

  async getTodoById(
    c: Context<{ Variables: Variables }, TodosRoutes.GET_BY_ID>,
    id: string,
  ) {
    /// Get todo by id
    const todo = await this.todoService.getTodoById(Number(id));
    if (!todo) {
      return c.json<ApiResponse>(
        {
          success: false,
          error: "Todo not found",
        },
        404,
      );
    }
    /// Response
    return c.json<ApiResponse<typeof todo>>({
      success: true,
      data: todo,
    });
  }

  async getTodos(c: Context<{ Variables: Variables }, TodosRoutes.GET_ALL>) {
    /// Get all todos
    const todos = await this.todoService.getTodos();
    /// Response
    return c.json<ApiResponse<typeof todos>>({
      success: true,
      data: todos,
    });
  }

  async deleteTodoById(
    c: Context<{ Variables: Variables }, TodosRoutes.DELETE_BY_ID>,
    id: string,
  ) {
    const todo = await this.todoService.getTodoById(Number(id));
    if (!todo) {
      return c.json<ApiResponse>(
        {
          success: false,
          error: "Todo not found",
        },
        404,
      );
    }
    /// Delete todo by id
    await this.todoService.deleteTodoById(Number(id));
    /// Response
    return c.json<ApiResponse<null>>({
      success: true,
      data: null,
    });
  }
}
