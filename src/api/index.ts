/** @notice library imports */
import { Hono } from "hono";
/// Local imports
import { ApplicationRoutes } from "./routes";

/// Routers
import { helloRouter } from "@/api/hello/helloRouter";

/// Root application router
export const rootRouter = new Hono({
  strict: false,
}).route(ApplicationRoutes.ROOT, helloRouter);
