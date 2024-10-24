import { ApiResponse } from './ApiResponse'

import { Reservation, GetLocationReservation, Calendar } from '../reservation'
import { Pagination } from '../pagination'

export type GetReservationsResponse = ApiResponse<{
  rows: Reservation[]
  pagination: Pagination
}>


export type GetCourtsResponse = ApiResponse<GetLocationReservation[]>

export type CalendarResponse = ApiResponse<Calendar>