export interface Users {
  id: number
  username: string
  email: string
  password_hash: string
  created_at: Date
  updated_at: Date
}

export interface CreateUserDto {
  username: string
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

// 添加登录响应类型
export interface LoginResponse {
  token: string
  user: Omit<Users, 'password_hash'>
}

// 添加更新用户信息的DTO
export interface UpdateUserDto {
  username?: string
  email?: string
  password?: string
}
