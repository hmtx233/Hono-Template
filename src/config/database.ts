/** @notice library imports */
import "reflect-metadata";
import { DataSource } from "typeorm";
/// Custom imports
import { User } from "@/entity/User";
import { Environments, isInDevelopment, isInTesting } from "./environments";

export const AppDataSource = new DataSource({
  type: "postgres",
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
  host: Environments.DATABASE_HOST,
  port: Environments.DATABASE_PORT,
  database: Environments.DATABASE_NAME,
  username: Environments.DATABASE_USERNAME,
  password: Environments.DATABASE_PASSWORD,
  synchronize: isInTesting || isInDevelopment,
});
