import { User } from '../user'

export type AuthResponse = {
  message: string
  statusCode: number
  data: {
    token: string
    user: User
  }
}
