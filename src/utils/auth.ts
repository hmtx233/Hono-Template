import { sign } from 'jsonwebtoken'
export const SECRET_KEY = process.env['SECRET_KEY'] || 'your_default_secret_key';
export const generateToken = (userId: number) => {
  return sign({ userId }, SECRET_KEY, {
    expiresIn: '1d'
  })
}
