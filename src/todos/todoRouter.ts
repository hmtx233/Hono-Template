/** @notice library imports */
import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";
/// Local imports
import { TodosRoutes } from "@/constants/routes";

/// Todo router
export const todoRouter = new Hono({
  strict: false,
})
  /// Create todo
  .post(TodosRoutes.CREATE_TODO, async (c) => {
    const { name } = await c.req.json();
    return c.json(
      {
        name,
      },
      StatusCodes.CREATED,
    );
  })

  /// Get todo by id
  .get(TodosRoutes.GET_TODO_BY_ID, async (c) => {
    const { id } = c.req.param();
    return c.text(`Got todo, ${id}`);
  })

  /// Get todos
  .get(TodosRoutes.GET_ALL_TODOS, async (c) => {
    return c.text(`Got todos`);
  });
