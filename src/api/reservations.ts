import axios from './axios'

import { AxiosResponse } from 'axios'

import { Reservation as ReservationType, Calendar as CalendarType } from '../types/reservation'
import { GetReservationByIdResponse } from '../types/responses/GetReservationByIdResponse'
import { GetReservationsResponse } from '../types/responses/GetReservationsResponse'
import { GetReservationsSchema } from '../types/schemas/GetReservationsSchema'
import { url } from '../url'

export const getReservations = async (
  reservationsSchema: GetReservationsSchema,
  token: string
): Promise<ReservationType[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetReservationsResponse> =
      await axios.get(`${url.api.reservations}`, {
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

export const getCourtsReservations = async (establishmentsId: number, paramsReservation: any, token: string) : Promise<ReservationType[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetReservationsResponse> =
      await axios.get(`${url.api.establishments}/${establishmentsId}/playing-fields`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...paramsReservation,
        },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
  } catch (error) {
    throw error
  }
}

export const getDaysHabilitationReservation = async (paramsGet: any, token: string): Promise<CalendarType | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetReservationsResponse> =
      await axios.get(`${url.api.establishments}/calendar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { ...paramsGet },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data;
    }
    throw Error('Error al obtener las fechas')
  } catch (error) {
    throw error
  }
}

export const saveReservations = async () => {
  try {
    const axiosResponse = await axios.post(
      `/${url.api.reservations}/${reservationId}/hand-items`,
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
      await axios.get(`/${url.api.reservations}/${reservationId}`, {
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
    const axiosResponse = await axios.post(
      `/${url.api.reservations}/${reservationId}/hand-items`,
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
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error registrando la reserva')
  } catch (error) {
    throw error
  }
}
