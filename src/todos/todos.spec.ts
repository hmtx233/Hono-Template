/** @notice library imports */
import { testClient } from "hono/testing";
import { StatusCodes } from "http-status-codes";
/// Local imports
import { todoRouter } from "./todoRouter";
import { ApplicationRoutes } from "@/constants/routes";

/// Route - /todos
const app = testClient(todoRouter);

describe(ApplicationRoutes.TODOS, () => {
  /// Current test data
  const todoData = {
    description: "My first todo",
  };

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
});
