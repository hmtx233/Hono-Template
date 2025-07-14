/** @notice library imports */
import "reflect-metadata";
import { Hono } from "hono";

/// Local imports
import { handlers } from "@/handlers";
import { todoRouter } from "@/routers/todo.router";
import { ApplicationRoutes } from "@/enums/router.enum";

/// Core app
const app = new Hono({ strict: false });

/// Routers
app.route(ApplicationRoutes.TODOS, todoRouter);

/// Global handlers
app.onError(handlers.onErrorHandler);
app.notFound(handlers.onNotFoundHandler);

export default app;
