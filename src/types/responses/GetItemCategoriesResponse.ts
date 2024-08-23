import { ApiResponse } from './ApiResponse'

import { ItemCategory } from '../item'
import { Pagination } from '../pagination'

export type GetItemCategoriesResponse = ApiResponse<{
  rows: ItemCategory[]
  pagination: Pagination
}>
