import { Item } from './item'
import { PlayingField } from './playingField'

export type Reservation = {
  id: number
  code: string
  userId: number
  establishmentId: number
  schedule: Schedule
  playingField: Pick<PlayingField, 'id' | 'name' | 'description' | 'thumbnail'>
  reservationItems: ReservationItems[]
  itemsHanded: boolean
  payed: boolean
}

export type Calendar = {
  establishmentId: number
  days: Day[]
}

type Schedule = {
  id: number
  date: string
  timeInterval: number
  startTime: string
  endTime: string
}


export type Day = {
  date: string
  endTime: string
  interval: number
  startTime: string
}


export type GetDaysReservation = {
  establishmentId: number
  count?: number
  interval?: number
}

export type GetLocationReservation = {
  name: string
  description: string
  price: number
  enabled: boolean
  thumbnail: string
  id: number
  establishmentId: number
  priceBracket: {
    id: number,
    endTime: string
    startTime: string
    priceOffset: number,
  }
}

export type ParamsLocationReservation = {
  establishmentId: number
  date?: string
  startTime: string
  interval?: number | null
}

export type NewReservation = {
  dateInit: string
  priceFinal: number
  documentUrl: string | null
  startTime: string
  dayinit: string
  intervalItem: number | null
  establishmentId: number | null
}

export type ClientReservation = {
  firstName: string
  lastName: string
  documentType: string
  documentNumber: string | null
  email: string | null
  id?: number| null
  [key: string]: any; 
}

export type ReservationItems = Pick<
  Item,
  'name' | 'description' | 'thumbnail' | 'price'
> & { quantity: number }
