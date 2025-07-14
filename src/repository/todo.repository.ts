import { eq } from "drizzle-orm";
import { Todos } from "@/schemas/tables.schemas";
import { database } from "@/config/database";
import { CreateTodoDto } from "@/models/todos.model";

export class TodoRepository {
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

  async findByUserId(userId: number) {
    return await database.query.Todos.findMany({
      where: eq(Todos.user_id, userId),
    });
  }

  async deleteById(id: number) {
    return await database.delete(Todos).where(eq(Todos.id, id));
  }
}