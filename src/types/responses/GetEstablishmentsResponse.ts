import { ApiResponse } from './ApiResponse'

import { Establishment } from '../establishment'

export type GetEstablishmentsResponse = ApiResponse<
  Pick<Establishment, 'id' | 'name'>[]
>
