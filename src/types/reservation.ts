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

type Day = {
  date: string
  endTime: string
  interval: string
  startTime: string
}

export type ReservationItems = Pick<
  Item,
  'name' | 'description' | 'thumbnail' | 'price'
> & { quantity: number }
