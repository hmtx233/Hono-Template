import { Pool, QueryResult } from 'pg'
import { Users, CreateUserDto } from '@/models/users.model'

export class UserRepository {
  constructor(private pool: Pool) {}

  async findByEmail(email: string): Promise<Users | null> {
    const result: QueryResult = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
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
}
