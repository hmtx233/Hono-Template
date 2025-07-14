/** @notice local imports */
import { onErrorHandler } from "./error.handler";
import { onNotFoundHandler } from "./notfound.handler";

/// Export all the handlers
export const handlers = Object.freeze({
  onErrorHandler,
  onNotFoundHandler,
});
