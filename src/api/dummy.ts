import { Employee } from '../types/employee'
import { Item } from '../types/item'
import { Payment } from '../types/payment'
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
  enabled: true,
  price: 2.5,
  thumbnail: 'url.com',
}
export const itemsListExample: Item[] = [
  {
    id: 1,
    name: 'gaytorade',
    description: 'bebida gaytorade',
    enabled: true,
    price: 2.5,
    thumbnail: 'url.com',
  },
  {
    id: 2,
    name: 'powerade',
    description: 'bebida powerade',
    enabled: false,
    price: 2,
    thumbnail: 'url.com',
  },
]

export const employeeExample: Employee = {
  id: 1,
  role: {
    id: 1,
    roleName: 'string',
    accessLevel: 'string'
  },
  firstName: 'Juancho',
  lastName: 'Lopecho',
  enabled: true,
}
export const employeesListExample: Employee[] = [
  {
    id: 1,
    role: {
      id: 1,
      roleName: 'string',
      accessLevel: 'string'
    },
    firstName: 'Juancho',
    lastName: 'Lopecho',
    enabled: true,
  },
  {
    id: 2,
    role: {
      id: 1,
      roleName: 'string',
      accessLevel: 'string'
    },
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
  idEstablishment: 1,
  idPlayingField: 1,
  idPriceBracket: 1,
  itemsHanded: true,
  totalPrice: 200,
  endtime: new Date(),
  idUser: 1,
}
export const reservesListExample: Reserve[] = [
  {
    id: 1,
    idSchedule: 1,
    idEstablishment: 1,
    idPlayingField: 1,
    idPriceBracket: 1,
    itemsHanded: true,
    totalPrice: 200,
    endtime: new Date(),
    idUser: 1,
  },
  {
    id: 2,
    idSchedule: 1,
    idEstablishment: 1,
    idPlayingField: 1,
    idPriceBracket: 1,
    itemsHanded: false,
    totalPrice: 250,
    endtime: new Date(),
    idUser: 3,
  },
]

export const paymentExample: Payment = {
  id: 1,
  idReserve: 2,
  status: 'paid',
  transactionCode: '111222333',
}
export const paymentsListExample: Payment[] = [
  {
    id: 1,
    idReserve: 2,
    status: 'paid',
    transactionCode: '111222333',
  },
  {
    id: 2,
    idReserve: 3,
    status: 'pending',
    transactionCode: '222333444',
  },
  {
    id: 3,
    idReserve: 4,
    status: 'pending',
    transactionCode: '333444555',
  },
  {
    id: 4,
    idReserve: 5,
    status: 'failed',
    transactionCode: '444555666',
  },
]
