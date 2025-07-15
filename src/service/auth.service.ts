import { verify, hash } from 'argon2'
import { CreateUserDto, LoginDto, Users, UpdateUserDto } from '@/models/users.model'
import { AuthRepository } from '@/repository/auth.repository'
import { generateToken } from '@/utils/auth'

export class AuthService {
  constructor(private authRepository: AuthRepository) { }

  async register(user: CreateUserDto): Promise<{ token: string }> {
    // 检查邮箱是否已存在
    const existingUser = await this.authRepository.findByEmail(user.email)
    if (existingUser) {
      throw new Error('Email already exists')
    }

    // 哈希密码
    const passwordHash = await hash(user.password)

    // 创建用户
    const newUser = await this.authRepository.create({
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
    const user = await this.authRepository.findByEmail(loginDto.email)
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

  // 添加获取用户信息的方法
  async getUserProfile(userId: number): Promise<Omit<Users, 'password_hash'> | null> {
    const user = await this.authRepository.findById(userId)
    if (!user) {
      return null
    }
    
    // 返回用户信息，但排除密码哈希
    const { password_hash, ...userProfile } = user
    return userProfile
  }

  // 添加更新用户信息的方法
  async updateUserProfile(userId: number, updateData: UpdateUserDto): Promise<Omit<Users, 'password_hash'> | null> {
    // 检查用户是否存在
    const existingUser = await this.authRepository.findById(userId)
    if (!existingUser) {
      throw new Error('User not found')
    }

    // 如果要更新邮箱，检查邮箱是否被其他用户使用
    if (updateData.email) {
      const emailExists = await this.authRepository.findByEmailExcludingUser(updateData.email, userId)
      if (emailExists) {
        throw new Error('Email already exists')
      }
    }

    // 如果要更新密码，先进行哈希处理
    const processedUpdateData = { ...updateData }
    if (updateData.password) {
      processedUpdateData.password = await hash(updateData.password)
    }

    // 更新用户信息
    const updatedUser = await this.authRepository.updateUser(userId, processedUpdateData)
    if (!updatedUser) {
      throw new Error('Failed to update user')
    }

    // 返回更新后的用户信息，但排除密码哈希
    const { password_hash, ...userProfile } = updatedUser
    return userProfile
  }
}
