/** @notice library imports */
import express from "express";
/// Local imports
import { format } from "@/utils/formatter";

const app = express();

app.get("/", (_req, res) => {
  res.json({
    message: `Hello Hono!`,
    formatted: format("SO cool"),
  });
});

export default app;
