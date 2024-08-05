import { Pagination } from '../pagination'
import { User } from '../user'

export type GetUsersResponse = {
  message: string
  statusCode: number
  data: {
    rows: User[]
    pagination: Pagination
  }
}
