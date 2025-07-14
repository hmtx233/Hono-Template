import { sign, verify } from 'jsonwebtoken'
export const SECRET_KEY = process.env['SECRET_KEY'] || 'your_default_secret_key';

export const generateToken = (userId: number) => {
  return sign({ userId }, SECRET_KEY, {
    expiresIn: '1d'
  })
}

export const verifyToken = (token: string): { userId: number } | null => {
  try {
    const decoded = verify(token, SECRET_KEY) as { userId: number }
    return decoded
  } catch (error) {
    return null
  }
}
