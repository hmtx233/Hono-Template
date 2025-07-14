/** @notice library imports */
import { boolean, date, pgTable, serial, text, integer } from "drizzle-orm/pg-core";

/// Core todos table
export const Todos = pgTable("todos", {
  id: serial(),
  description: text(),
  is_completed: boolean().default(false),
  user_id: integer(), // 添加用户ID字段
});


export const Users = pgTable("users", {
  id: serial(),
  username: text(),
  email: text(),
  password_hash: text(),
  created_at: date(),
  updated_at: date(),
});
