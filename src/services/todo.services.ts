/** @notice library imports */
/// Local imports
import { Todos } from "@/models";
import { database } from "@/config/database";
import { eq } from "drizzle-orm";

type ICreateParams = {
  description: string;
  isCompleted: boolean;
};

export class TodoServices {
  // 插入todo
  async create(params: ICreateParams) {
    const result = await database.insert(Todos).values(params).returning({
      id: Todos.id,
    });
    return result.at(0)!;
  }

  //  获取具体的 todo
  async getTodoById(id: number) {
    return await database.query.Todos.findFirst({
      where: (todos, { eq }) => eq(todos.id, id),
    });
  }

  // 获取所有 todos
  async getTodos() {
    return await database.query.Todos.findMany();
  }

  // 根据id 删除
  async deleteTodoById(id: number) {
    return await database.delete(Todos).where(eq(Todos.id, id));
  }
}
