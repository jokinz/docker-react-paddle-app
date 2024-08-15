import { ApiResponse } from './ApiResponse'

import { Pagination } from '../pagination'
import { User } from '../user'

export type GetUsersResponse = ApiResponse<{
  rows: User[]
  pagination: Pagination
}>
