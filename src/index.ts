/** @notice library imports */
import { serve } from "@hono/node-server";
/// Local imports
import app from "@/core/application";
import { Environments } from "@/config";

/// Running application
serve({
  fetch: app.fetch,
  port: Environments.PORT,
});
