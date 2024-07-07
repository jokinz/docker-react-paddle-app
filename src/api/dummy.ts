import { Employee } from '../types/employee'
import { Item } from '../types/item'
import { PlayingField } from '../types/playingField'
import { Reserve } from '../types/reserve'
import { User } from '../types/user'

export const emulateApiCall = <T, T2>(
  result: T,
  status: 'success' | 'fail',
  arg?: T2,
  miliseconds: number = 1500
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'success') {
        resolve(result)
      } else {
        reject({ success: false, error: 'Request failed' })
        // throw new Error('Request failed')
      }
    }, miliseconds)
  })
}

export const userExample: User = {
  id: 1,
  firstName: 'Juan',
  lastName: 'Lopez',
  documentNumber: '12365478',
  documentType: 'dni',
  district: 'd1',
  email: 'prueba@test.com',
  phone: '987456321',
  profileImage: 'url.com',
}
export const usersListExample: User[] = [
  {
    id: 1,
    firstName: 'Juan',
    lastName: 'Lopez',
    documentNumber: '12365478',
    documentType: 'DNI',
    district: 'd2',
    email: 'prueba@test.com',
    phone: '987456321',
    profileImage: 'url.com',
  },
  {
    id: 2,
    firstName: 'Juan2',
    lastName: 'Lopez2',
    documentNumber: '123654782',
    documentType: 'DNI2',
    district: 'd3',
    email: 'prueba@test.com2',
    phone: '9874563212',
    profileImage: 'url.com2',
  },
]

export const itemExample: Item = {
  id: 1,
  name: 'gaytorade',
  description: 'bebida gaytorade',
  enable: true,
  price: 2.5,
  thumbnail: 'url.com',
}
export const itemsListExample: Item[] = [
  {
    id: 1,
    name: 'gaytorade',
    description: 'bebida gaytorade',
    enable: true,
    price: 2.5,
    thumbnail: 'url.com',
  },
  {
    id: 2,
    name: 'powerade',
    description: 'bebida powerade',
    enable: false,
    price: 2,
    thumbnail: 'url.com',
  },
]

export const employeeExample: Employee = {
  id: 1,
  idRole: 1,
  firstName: 'Juancho',
  lastName: 'Lopecho',
  enabled: true,
}
export const employeesListExample: Employee[] = [
  {
    id: 1,
    idRole: 1,
    firstName: 'Juancho',
    lastName: 'Lopecho',
    enabled: true,
  },
  {
    id: 2,
    idRole: 1,
    firstName: 'Juancho2',
    lastName: 'Lopecho2',
    enabled: false,
  },
]

export const playingFieldExample: PlayingField = {
  id: 1,
  idEstablishment: 1,
  name: 'cancha 1',
  description: 'cancha de paddle 1',
  thumbnail: 'url.com',
  price: 150,
  available: true,
}
export const playingFieldsListExample: PlayingField[] = [
  {
    id: 1,
    idEstablishment: 1,
    name: 'cancha 1',
    description: 'cancha de paddle 1',
    thumbnail: 'url.com',
    price: 150,
    available: true,
  },
  {
    id: 2,
    idEstablishment: 1,
    name: 'cancha 2',
    description: 'cancha de paddle 2',
    thumbnail: 'url.com',
    price: 150,
    available: false,
  },
]

export const reserveExample: Reserve = {
  id: 1,
  idSchedule: 1,
  idStablishment: 1,
  idPlayingField: 1,
  idPriceBracket: 1,
  itemsHanded: true,
  totalPrice: 200,
  endtime: new Date(),
}
export const reservesListExample: Reserve[] = [
  {
    id: 1,
    idSchedule: 1,
    idStablishment: 1,
    idPlayingField: 1,
    idPriceBracket: 1,
    itemsHanded: true,
    totalPrice: 200,
    endtime: new Date(),
  },
  {
    id: 2,
    idSchedule: 1,
    idStablishment: 1,
    idPlayingField: 1,
    idPriceBracket: 1,
    itemsHanded: false,
    totalPrice: 250,
    endtime: new Date(),
  },
]
