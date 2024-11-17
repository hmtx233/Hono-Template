/** @notice library imports */
/// Local imports
import app from "@/core/application";
import { Environments } from "@/config";

/// Running application
app.listen(Environments.PORT, () => {
  console.log(`Running on :${Environments.PORT}`);
});
