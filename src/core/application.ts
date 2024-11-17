/** @notice library imports */
import express from "express";

/// Local imports
import { format } from "@/utils/formatter";
import { globalErrorHandler } from "@/middleware/globalErrorHandler";

const app = express();

app.get("/", (_req, res) => {
  res.json({
    message: `Hello Hono!`,
    formatted: format("SO cool"),
  });
});

/// Global error catcher
app.use(globalErrorHandler);

export default app;
