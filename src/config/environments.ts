/** @notice library imports */
import { grabEnv } from "@rajmazumder/grabenv";

/// Interface of Env
interface IEnvironments {
  PORT?: number;

  /// Database ///
  DATABASE_PORT: number;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
}

/// Environments
export const Environments = grabEnv<IEnvironments>({
  PORT: {
    type: "number",
    defaultValue: 3000,
  },

  /// Database ///
  DATABASE_PORT: {
    type: "number",
  },
  DATABASE_HOST: {
    type: "string",
  },
  DATABASE_NAME: {
    type: "string",
  },
  DATABASE_USERNAME: {
    type: "string",
  },
  DATABASE_PASSWORD: {
    type: "string",
  },
});

export const isInTesting = Environments.NODE_ENV === "test";
export const isInDevelopment = Environments.NODE_ENV === "development";
