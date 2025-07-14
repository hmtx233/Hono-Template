/** @notice library imports */
import { createMiddleware } from "hono/factory";
import { Pool } from 'pg';
/// local imports
import { UserRepository } from "@/repository/user.repository";
import { AuthService } from "@/services/auth.service";
import { AuthController } from "@/controllers/auth.controller";
import { Environments } from "@/config/environments";

/// Variable type
export type Variables = {
  authController: AuthController;
};

/// Dependencies
const pool = new Pool({
  connectionString: Environments.DATABASE_URL
});

const authRepository = new UserRepository(pool);

const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

/// Dependency injection
export const injectAuthDependenciesMiddleware = createMiddleware<{
  Variables: Variables;
}>(async (c, next) => {
  c.set("authController", authController);
  await next();
});
