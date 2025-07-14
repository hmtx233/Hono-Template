import { Pool, QueryResult } from 'pg'
import { User, CreateUserDto } from '@/models/user.model'

export class UserRepository {
  constructor(private pool: Pool) {}

  async findByEmail(email: string): Promise<User | null> {
    const result: QueryResult = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
    return result.rows[0] || null
  }

  async create(user: CreateUserDto): Promise<User> {
    const result: QueryResult = await this.pool.query(
      `INSERT INTO users (username, email, password_hash, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [user.username, user.email, user.password]
    )
    return result.rows[0]
  }
}
