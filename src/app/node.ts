/** @notice library imports */
import { serve } from "@hono/node-server";
/// Local imports
import app from "@/app/application";

/// Running application
serve(app);
