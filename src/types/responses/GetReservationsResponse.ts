import { ApiResponse } from './ApiResponse'

import { Reservation } from '../reservation'
import { Pagination } from '../pagination'

export type GetReservationsResponse = ApiResponse<{
  rows: Reservation[]
  pagination: Pagination
}>
