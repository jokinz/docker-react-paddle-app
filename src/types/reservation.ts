import { Item } from './item'
import { PlayingField } from './playingField'

export type Reservation = {
  id: number
  code: string
  userId: number
  establishmentId: number
  schedule: Schedule
  playingField: Pick<PlayingField, 'id' | 'name' | 'description' | 'thumbnail'>
  // TODO: consultar icon
  reservationItems: Pick<Item, 'name' | 'description' | 'thumbnail' | 'price'> &
    { quantity: number }[]
  itemsHanded: boolean
  payed: boolean
}

type Schedule = {
  id: number
  date: string
  timeInterval: number
  startTime: string
  endTime: string
}
