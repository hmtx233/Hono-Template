# Hono Drizzle Postgres Template

A streamlined GitHub template using Hono, TypeScript, Drizzle ORM, and PostgreSQL. This starter kit offers a solid foundation for building fast, type-safe, and scalable web applications. Pre-configured with database setup, routing, and ORM integration, it accelerates development and ensures best practices right out of the box.

## 功能特性

- **Hono框架**: 轻量级、高性能的Web框架
- **TypeScript**: 类型安全的JavaScript超集
- **Drizzle ORM**: 类型安全的ORM，用于PostgreSQL
- **JWT认证**: 基于JSON Web Token的用户认证系统
- **Repository模式**: 清晰的代码分层，提高可维护性
- **依赖注入**: 使用Hono的中间件实现依赖注入

## 认证功能

本项目实现了完整的JWT认证系统，包括：

- 用户注册和登录API
- JWT令牌生成和验证
- 受保护的API端点
- 用户与数据关联

详细文档请参阅 [认证功能使用说明](./docs/authentication.md)。

## 数据库迁移

如果你需要运行数据库迁移脚本，请参阅 [数据库迁移说明](./src/migrations/README.md)。
