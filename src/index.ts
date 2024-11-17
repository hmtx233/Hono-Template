/** @notice library imports */
import { serve } from "@hono/node-server";
/// Local imports
import app from "@/core/application";

/// Running application
serve(app);
