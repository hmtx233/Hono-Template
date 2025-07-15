import { TodoRepository } from '@/repository/todo.repository';
import { CreateTodoDto } from '@/models/todos.model';
import { PaginationParams, PaginationResult } from '@/types/Pagination';

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async createTodo(todo: CreateTodoDto) {
    return await this.todoRepository.create(todo);
  }

  async getTodoById(id: number) {
    return await this.todoRepository.findById(id);
  }

  async getAllTodos() {
    return await this.todoRepository.findAll();
  }

  // 添加分页获取所有todos
  async getAllTodosWithPagination(params: PaginationParams): Promise<PaginationResult<any>> {
    return await this.todoRepository.findAllWithPagination(params);
  }

  async getTodosByUserId(userId: number) {
    return await this.todoRepository.findByUserId(userId);
  }

  // 添加按用户ID分页获取todos
  async getTodosByUserIdWithPagination(
    userId: number, 
    params: PaginationParams
  ): Promise<PaginationResult<any>> {
    return await this.todoRepository.findByUserIdWithPagination(userId, params);
  }

  async deleteTodo(id: number) {
    return await this.todoRepository.deleteById(id);
  }
}
