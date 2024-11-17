/** @notice library imports */
import { Hono } from "hono";
import { HelloRoutes } from "../routes";

/// Hello router
export const helloRouter = new Hono({
  strict: false,
}).get(HelloRoutes.SAY_HELLO, (c) => {
  const { name } = c.req.param();
  return c.text(`Hello, ${name}!`);
});
