import { eq } from "drizzle-orm";
import { Todos } from "@/schema/tables.schemas";
import { database } from "@/config/database";
import { CreateTodoDto } from "@/models/todos.model";
import { BaseRepository } from './BaseRepository';
import { PaginationParams, PaginationResult } from '@/types/Pagination';

export class TodoRepository extends BaseRepository<typeof Todos> {
  constructor() {
    super(Todos);
  }

  async create(params: CreateTodoDto) {
    const result = await database.insert(Todos).values(params).returning({
      id: Todos.id,
    });
    return result.at(0)!;
  }

  async findById(id: number) {
    return await database.query.Todos.findFirst({
      where: eq(Todos.id, id),
    });
  }

  async findAll() {
    return await database.query.Todos.findMany();
  }

  // 添加分页查询所有todos
  async findAllWithPagination(params: PaginationParams): Promise<PaginationResult<any>> {
    return this.findWithPagination(params);
  }

  async findByUserId(userId: number) {
    return await database.query.Todos.findMany({
      where: eq(Todos.user_id, userId),
    });
  }

  // 添加按用户ID分页查询
  async findByUserIdWithPagination(
    userId: number, 
    params: PaginationParams
  ): Promise<PaginationResult<any>> {
    return this.findWithPagination(params, eq(Todos.user_id, userId));
  }

  async deleteById(id: number) {
    return await database.delete(Todos).where(eq(Todos.id, id));
  }
}
