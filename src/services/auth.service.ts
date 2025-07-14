import { verify, hash } from 'argon2'
import { CreateUserDto, LoginDto } from '@/models/users.model'
import { UserRepository } from '@/repository/user.repository'
import { generateToken } from '@/utils/auth'

export class AuthService {
  constructor(private userRepository: UserRepository) { }

  async register(user: CreateUserDto): Promise<{ token: string }> {
    // 检查邮箱是否已存在
    const existingUser = await this.userRepository.findByEmail(user.email)
    if (existingUser) {
      throw new Error('Email already exists')
    }

    // 哈希密码
    const passwordHash = await hash(user.password)

    // 创建用户
    const newUser = await this.userRepository.create({
      username: user.username,
      email: user.email,
      password: passwordHash
    })

    // 生成 JWT
    const token = generateToken(newUser.id)

    return { token }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    // 查找用户
    const user = await this.userRepository.findByEmail(loginDto.email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    // 验证密码
    const isPasswordValid = await verify(user.password_hash, loginDto.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    // 生成 JWT
    const token = generateToken(user.id)

    return { token }
  }
}
