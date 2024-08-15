import { ApiResponse } from './ApiResponse'

import { Employee } from '../employee'
import { Pagination } from '../pagination'

export type GetEmployeesResponse = ApiResponse<{
  rows: Employee[]
  pagination: Pagination
}>
