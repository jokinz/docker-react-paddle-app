import axios from './axios'

import { AxiosResponse } from 'axios'

import { Reservation as ReservationType, Calendar as CalendarType, GetDaysReservation, ParamsLocationReservation, GetLocationReservation as LocationPlaying  } from '../types/reservation'
import { GetReservationByIdResponse } from '../types/responses/GetReservationByIdResponse'
import { GetReservationsResponse, GetCourtsResponse, CalendarResponse } from '../types/responses/GetReservationsResponse'
import { GetReservationsSchema } from '../types/schemas/GetReservationsSchema'
import { url } from '../url'

export const getReservations = async (
  reservationsSchema: GetReservationsSchema,
  token: string
): Promise<ReservationType[] | undefined> => {
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
}

export const getCourtsReservations = async (establishmentsId: number, paramsLocation: ParamsLocationReservation, token: string) : Promise<LocationPlaying[] | undefined> => {
  const axiosResponse: AxiosResponse<GetCourtsResponse> =
    await axios.get(`${url.api.establishments}/${establishmentsId}/playing-fields`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...paramsLocation,
      },
    })
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data
  }
  throw Error('Error descargando reservaciones')
}

export const getDaysHabilitationReservation = async (paramsGet: GetDaysReservation, token: string): Promise<CalendarType | undefined> => {
  const axiosResponse: AxiosResponse<CalendarResponse> =
    await axios.get(`${url.api.establishments}/calendar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...paramsGet },
    })
    debugger;
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data;
  }
  throw Error('Error al obtener las fechas')
}

export const saveReservations = async (paramsSaveReservation: any, token: string) => {
  const axiosResponse = await axios.post(
    `/${url.api.reservations}`,
    {
      ...paramsSaveReservation,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (axiosResponse.status === 204) {
    return true
  }
}

export const getReservationById = async (
  reservationId: number,
  token: string
): Promise<ReservationType | undefined> => {
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
}

export const updateReservationHandItemsById = async (
  reservationId: number,
  token: string
): Promise<true | undefined> => {
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
}
