/** @notice library imports */
/// Local imports
import { TodoRepository } from "@/repository/todo.repository";
import { CreateTodoDto } from "@/models/todos.model";

export class TodoServices {
  constructor(private todoRepository: TodoRepository) {}

  // 插入todo
  async create(params: CreateTodoDto) {
    return await this.todoRepository.create(params);
  }

  //  获取具体的 todo
  async getTodoById(id: number) {
    return await this.todoRepository.findById(id);
  }

  // 获取所有 todos
  async getTodos() {
    return await this.todoRepository.findAll();
  }

  // 获取用户的所有 todos
  async getTodosByUserId(userId: number) {
    return await this.todoRepository.findByUserId(userId);
  }

  // 根据id 删除
  async deleteTodoById(id: number) {
    return await this.todoRepository.deleteById(id);
  }
}
