/** @notice library imports */
import { DataSource } from "typeorm";
import { testClient } from "hono/testing";
import { StatusCodes } from "http-status-codes";
/// Local imports
import { Todo } from "./TodoEntity";
import { todoRouter } from "./todoRouter";
import { AppDataSource } from "@/config/database";
import { ApplicationRoutes } from "@/constants/routes";
import { truncateDatabase } from "@/utils/databaseTruncate";

/// Route - /todos
const app = testClient(todoRouter);

describe(ApplicationRoutes.TODOS, () => {
  let connection: DataSource;

  /// Database connection
  beforeAll(async () => {
    connection = await AppDataSource.initialize();
  });

  beforeEach(async () => {
    await truncateDatabase(connection);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  /// Current test data
  const todoData = {
    description: "My first todo",
  };

  describe("[POST] /todos", () => {
    it("Should return status 201 after creation.", async () => {
      const response = await app.index.$post({
        json: todoData,
      });

      expect(response.status).toBe(StatusCodes.CREATED);
    });

    it("Should return json response.", async () => {
      const response = await app.index.$post({
        json: todoData,
      });

      expect(response.headers.get("content-type")).toStrictEqual(
        expect.stringContaining("json"),
      );
    });

    it("Should persist the user in the database.", async () => {
      await app.index.$post({
        json: todoData,
      });

      const todoRepo = connection.getRepository(Todo);
      const todos = await todoRepo.find();

      expect(todos).toHaveLength(1);
      expect(todos[0].isCompleted).toBeFalsy();
      expect(todos[0].description).toBe(todoData.description);
    });
  });
});
