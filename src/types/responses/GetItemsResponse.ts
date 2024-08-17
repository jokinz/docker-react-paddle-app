import { ApiResponse } from './ApiResponse'

import { Item } from '../item'
import { Pagination } from '../pagination'

export type GetItemsResponse = ApiResponse<{
  rows: Item[]
  pagination: Pagination
}>
