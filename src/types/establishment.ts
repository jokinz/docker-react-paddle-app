import { PriceBracket } from './priceBracket'

export type Establishment = {
  id: number
  name: string
  description: string
  address: string
  startTime: string
  endTime: string
  latitude: string
  longitud: string
}

export type UpdateEstablishment = Pick<
  Establishment,
  'id' | 'startTime' | 'endTime'
> & {
  priceBrackets: Pick<PriceBracket, 'startTime' | 'endTime' | 'priceOffset'>[]
  returning?: boolean
}
