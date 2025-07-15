import { Context } from 'hono';
import { TodoService } from '@/service/todo.service';
import { extractPaginationFromQuery } from '@/utils/pagination';
import { PaginatedApiResponse } from '@/types/ApiResponse';
import { createTodoSchema } from '@/validator/todo.validator';

export class TodoController {
  constructor(private todoService: TodoService) {}

  // 创建新的todo
  async createTodo(ctx: Context) {
    try {
      const body = await ctx.req.json();
      const validatedData = createTodoSchema.parse(body);
      
      const userId = ctx.get('user_id');
      if (!userId) {
        return ctx.json({ success: false, error: 'User not authenticated' }, 401);
      }

      const todoData = {
        ...validatedData,
        user_id: userId
      };

      const todo = await this.todoService.createTodo(todoData);
      return ctx.json({ success: true, data: todo }, 201);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return ctx.json({ success: false, error: 'Validation failed', details: error.errors }, 400);
      }
      return ctx.json({ success: false, error: error.message }, 500);
    }
  }

  // 根据ID获取todo
  async getTodoById(ctx: Context) {
    try {
      const id = parseInt(ctx.req.param('id'));
      if (isNaN(id)) {
        return ctx.json({ success: false, error: 'Invalid todo ID' }, 400);
      }

      const todo = await this.todoService.getTodoById(id);
      if (!todo) {
        return ctx.json({ success: false, error: 'Todo not found' }, 404);
      }

      return ctx.json({ success: true, data: todo }, 200);
    } catch (error: any) {
      return ctx.json({ success: false, error: error.message }, 500);
    }
  }

  // 删除todo
  async deleteTodo(ctx: Context) {
    try {
      const id = parseInt(ctx.req.param('id'));
      if (isNaN(id)) {
        return ctx.json({ success: false, error: 'Invalid todo ID' }, 400);
      }

      const result = await this.todoService.deleteTodo(id);
      if (!result) {
        return ctx.json({ success: false, error: 'Todo not found' }, 404);
      }

      return ctx.json({ success: true, message: 'Todo deleted successfully' }, 200);
    } catch (error: any) {
      return ctx.json({ success: false, error: error.message }, 500);
    }
  }

  // 原有的获取所有todos方法
  async getAllTodos(ctx: Context) {
    try {
      const todos = await this.todoService.getAllTodos();
      return ctx.json({ success: true, data: todos }, 200);
    } catch (error: any) {
      return ctx.json({ success: false, error: error.message }, 500);
    }
  }

  // 新增：分页获取所有todos
  async getAllTodosWithPagination(ctx: Context) {
    try {
      const paginationParams = extractPaginationFromQuery(ctx.req.query());
      const result = await this.todoService.getAllTodosWithPagination(paginationParams);
      
      const response: PaginatedApiResponse = {
        success: true,
        data: result
      };
      
      return ctx.json(response, 200);
    } catch (error: any) {
      return ctx.json({ success: false, error: error.message }, 500);
    }
  }

  // 原有的按用户ID获取todos方法
  async getTodosByUserId(ctx: Context) {
    try {
      const userId = ctx.get('user_id');
      if (!userId) {
        return ctx.json({ success: false, error: 'User not authenticated' }, 401);
      }

      const todos = await this.todoService.getTodosByUserId(userId);
      return ctx.json({ success: true, data: todos }, 200);
    } catch (error: any) {
      return ctx.json({ success: false, error: error.message }, 500);
    }
  }

  // 新增：分页获取用户的todos
  async getUserTodosWithPagination(ctx: Context) {
    try {
      const userId = ctx.get('user_id');
      if (!userId) {
        return ctx.json({ success: false, error: 'User not authenticated' }, 401);
      }

      const paginationParams = extractPaginationFromQuery(ctx.req.query());
      const result = await this.todoService.getTodosByUserIdWithPagination(userId, paginationParams);
      
      const response: PaginatedApiResponse = {
        success: true,
        data: result
      };
      
      return ctx.json(response, 200);
    } catch (error: any) {
      return ctx.json({ success: false, error: error.message }, 500);
    }
  }
}
