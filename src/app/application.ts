import { Hono } from "hono";
import { format } from "@/utils/formatter";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: `Hello Hono!`,
    formatted: format("SO cool"),
  });
});

export default app;
