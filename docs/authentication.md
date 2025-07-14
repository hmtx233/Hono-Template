# 认证功能使用说明

## 概述

本项目实现了基于JWT（JSON Web Token）的认证系统，用于保护API端点并关联用户与其数据。

## 认证流程

1. 用户注册或登录，获取JWT令牌
2. 在后续请求中，将JWT令牌添加到请求头的`Authorization`字段中
3. 服务器验证令牌并识别用户
4. 只有经过认证的用户才能访问受保护的资源

## API端点

### 注册

```
POST /api/auth/register
```

请求体：

```json
{
  "username": "用户名",
  "email": "邮箱地址",
  "password": "密码（至少8个字符）"
}
```

响应：

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 登录

```
POST /api/auth/login
```

请求体：

```json
{
  "email": "邮箱地址",
  "password": "密码"
}
```

响应：

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 使用令牌访问受保护的API

所有的Todo API端点现在都需要认证。在请求头中添加令牌：

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

例如，使用curl创建一个新的todo：

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"description": "完成项目", "isCompleted": false}'
```

## 安全注意事项

- JWT令牌有效期为1天
- 请妥善保管你的令牌，不要泄露给他人
- 如果怀疑令牌被泄露，请更改密码（目前尚未实现令牌撤销功能）
- 生产环境中应使用HTTPS以保护令牌传输