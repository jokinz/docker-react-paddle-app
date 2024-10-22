import axios from './axios'

import { AxiosResponse } from 'axios'

import { Establishment, UpdateEstablishment } from '../types/establishment'
import { GetEstablishmentsResponse } from '../types/responses/GetEstablishmentsResponse'
import { url } from '../url'
import { GetEstablishmentByIdResponse } from '../types/responses/GetEstablishmentByIdResponse'

export const getAllEstablishments = async (
  token: string
): Promise<Pick<Establishment, 'id' | 'name'>[] | undefined> => {
  const axiosResponse: AxiosResponse<GetEstablishmentsResponse> =
    await axios.get(`/${url.api.establishments}/value`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data
  }
  throw new Error('Error descargando los establecimientos')
}

export const getEstablishmentById = async (
  establishmentId: number,
  token: string
): Promise<UpdateEstablishment | undefined> => {
  const axiosResponse: AxiosResponse<GetEstablishmentByIdResponse> =
    await axios.get(`/${url.api.establishments}/${establishmentId}/config`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data
  }
  throw new Error('Error descargando datos del establecimiento')
}

export const updateEstablishmentById = async (
  establishmentId: number,
  updateEstablishment: Partial<Omit<UpdateEstablishment, 'id'>>,
  token: string
): Promise<true | undefined> => {
  const axiosResponse = await axios.patch(
    `/${url.api.establishments}/${establishmentId}/config`,
    { ...updateEstablishment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (axiosResponse.status === 204) {
    return true
  }
  throw new Error('Error actualizando el establecimiento')
}
