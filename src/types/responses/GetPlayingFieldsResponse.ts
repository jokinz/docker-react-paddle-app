import { ApiResponse } from './ApiResponse'

import { PlayingField } from '../playingField'
import { Pagination } from '../pagination'

export type GetPlayingFieldsResponse = ApiResponse<{
  rows: PlayingField[]
  pagination: Pagination
}>
