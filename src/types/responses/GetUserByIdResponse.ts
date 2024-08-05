import { User } from '../user'

export type GetUserByIdResponse = {
  message: string
  statusCode: number
  data: User
}
