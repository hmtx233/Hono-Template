/** @notice library imports */
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import type { ApiResponse } from "@/types/ApiResponse";

/// Local imports
import { TodoServices } from "../services/todo.service";
import { TodosRoutes } from "@/enums/router.enum";
import { Variables } from "@/middlewares/todo.di";
import { log } from "console";

export class TodoController {
  constructor(private todoService: TodoServices) {}

  async createTodo(c: Context<{ Variables: Variables }, TodosRoutes.CREATE>) {
    /// Grab fields
    const { description, isCompleted } = await c.req.json();
    const userId = c.get('userId');
    
    log(
      "Creating todo with description:",
      description,
      "and isCompleted:",
      isCompleted,
      "for user:",
      userId
    );
    
    /// Save into database
    const { id } = await this.todoService.create({ 
      description, 
      is_completed:isCompleted,
      user_id:userId 
    });

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
    
    // 验证todo是否属于当前用户
    const userId = c.get('userId');
    if (todo.user_id !== userId) {
      return c.json<ApiResponse>(
        {
          success: false,
          error: "Unauthorized - This todo does not belong to you",
        },
        403,
      );
    }
    
    /// Response
    return c.json<ApiResponse<typeof todo>>({
      success: true,
      data: todo,
    });
  }

  async getTodos(c: Context<{ Variables: Variables }, TodosRoutes.GET_ALL>) {
    log('Getting todos for user:', c);
    log('Getting todos for user:', c.get('userId'));
    /// 获取当前用户的所有todos
    const userId = c.get('userId');
    const todos = await this.todoService.getTodosByUserId(userId);
    
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
    
    // 验证todo是否属于当前用户
    const userId = c.get('userId');
    if (todo.user_id !== userId) {
      return c.json<ApiResponse>(
        {
          success: false,
          error: "Unauthorized - This todo does not belong to you",
        },
        403,
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
