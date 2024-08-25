import axios from './axios'

import { AxiosResponse } from 'axios'

import { Reservation as ReservationType } from '../types/reservation'
import { GetReservationByIdResponse } from '../types/responses/GetReservationByIdResponse'
import { GetReservationsResponse } from '../types/responses/GetReservationsResponse'
import { GetReservationsSchema } from '../types/schemas/GetReservationsSchema'

export const getReservations = async (
  reservationsSchema: GetReservationsSchema,
  token: string
): Promise<ReservationType[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetReservationsResponse> =
      await axios.get('/reservations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { ...reservationsSchema },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data.rows
    }
    throw Error('Error descargando reservaciones')
  } catch (error) {
    throw error
  }
}

export const getReservationById = async (
  reservationId: number,
  token: string
): Promise<ReservationType | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetReservationByIdResponse> =
      await axios.get(`/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error descargando datos de la reserva')
  } catch (error) {
    throw error
  }
}

export const updateReservationHandItemsById = async (
  reservationId: number,
  token: string
): Promise<true | undefined> => {
  try {
    const axiosResponse = await axios.patch(
      `/reservation/${reservationId}/hand-items`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (axiosResponse.status === 204) {
      return true
    }
    throw new Error('Error actualizando la entrega de ítems')
  } catch (error) {
    throw error
  }
}
