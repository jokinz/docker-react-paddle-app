import { Reserve as ReserveType } from '../../types/reserve'
import { emulateApiCall, reserveExample, reservesListExample } from '../dummy'

export const getReserveById = async (
  id: number
): Promise<ReserveType | undefined> => {
  try {
    const response: ReserveType = await emulateApiCall(
      reservesListExample[id - 1],
      'success',
      id
    )
    if (response) {
      return response
    }
    throw new Error('Error descargando datos de reserva')
  } catch (error) {
    console.error(error)
  }
  return
}

export const updateReserveById = async (reserve: ReserveType) => {
  try {
    const response = await emulateApiCall(reserve, 'success')
    if (response) {
      return response
    }
    throw new Error('Error actualizando datos de reserva')
  } catch (error) {
    console.error(error)
  }
  return
}

export const getAllReserves = async (): Promise<ReserveType[] | undefined> => {
  try {
    const response: ReserveType[] = await emulateApiCall(
      reservesListExample,
      'success'
    )
    if (response) {
      return response
    }
    throw new Error('Error descargando reservas')
  } catch (error) {
    console.error(error)
  }
}
