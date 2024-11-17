/** @notice library imports */
/// Local imports
import app from "@/core/application";
import { Environments, Logger } from "@/config";

/// Running application
app.listen(Environments.PORT, () => {
  Logger.info(`Running`, { port: Environments.PORT });
});
