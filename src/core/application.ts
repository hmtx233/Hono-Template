/** @notice library imports */
import { Hono } from "hono";

/// Local imports
import { rootRouter } from "@/api";
import { handlers } from "@/middleware";

const app = new Hono();

app.route("/api/", rootRouter);

/// Global handlers
app.onError(handlers.onErrorHandler);
app.notFound(handlers.onNotFoundHandler);

export default app;
