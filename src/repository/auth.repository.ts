import { Pool, QueryResult } from 'pg'
import { Users, CreateUserDto, UpdateUserDto } from '@/models/users.model'

export class AuthRepository {
  constructor(private pool: Pool) {}

  async findByEmail(email: string): Promise<Users | null> {
    const result: QueryResult = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
    return result.rows[0] || null
  }

  // 添加根据ID查找用户的方法
  async findById(id: number): Promise<Users | null> {
    const result: QueryResult = await this.pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  }

  async create(user: CreateUserDto): Promise<Users> {
    const result: QueryResult = await this.pool.query(
      `INSERT INTO users (username, email, password_hash, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [user.username, user.email, user.password]
    )
    return result.rows[0]
  }

  // 添加更新用户信息的方法
  async updateUser(id: number, updateData: UpdateUserDto): Promise<Users | null> {
    const fields = []
    const values = []
    let paramIndex = 1

    if (updateData.username !== undefined) {
      fields.push(`username = $${paramIndex++}`)
      values.push(updateData.username)
    }

    if (updateData.email !== undefined) {
      fields.push(`email = $${paramIndex++}`)
      values.push(updateData.email)
    }

    if (updateData.password !== undefined) {
      fields.push(`password_hash = $${paramIndex++}`)
      values.push(updateData.password)
    }

    if (fields.length === 0) {
      throw new Error('No fields to update')
    }

    // 添加 updated_at 字段
    fields.push(`updated_at = NOW()`)
    
    // 添加用户ID作为最后一个参数
    values.push(id)

    const query = `
      UPDATE users 
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `

    const result: QueryResult = await this.pool.query(query, values)
    return result.rows[0] || null
  }

  // 检查邮箱是否被其他用户使用
  async findByEmailExcludingUser(email: string, userId: number): Promise<Users | null> {
    const result: QueryResult = await this.pool.query(
      'SELECT * FROM users WHERE email = $1 AND id != $2',
      [email, userId]
    )
    return result.rows[0] || null
  }
}
