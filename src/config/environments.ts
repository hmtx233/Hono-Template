/** @notice library imports */
import { grabEnv } from "@rajmazumder/grabenv";

/// Interface of Env
interface IEnvironments {
  PORT?: number;
}

/// Environments
export const Environments = grabEnv<IEnvironments>({
  PORT: {
    type: "number",
    defaultValue: 3000,
  },
});
