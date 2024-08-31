import axios from './axios'

import { AxiosResponse } from 'axios'

import { Establishment, UpdateEstablishment } from '../types/establishment'
import { GetEstablishmentsResponse } from '../types/responses/GetEstablishmentsResponse'
import { url } from '../url'
import { GetEstablishmentByIdResponse } from '../types/responses/GetEstablishmentByIdResponse'

export const getAllEstablishments = async (
  token: string
): Promise<Pick<Establishment, 'id' | 'name'>[] | undefined> => {
  try {
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
  } catch (error) {
    throw error
  }
}

export const getEstablishmentById = async (
  establishmentId: number,
  token: string
): Promise<UpdateEstablishment | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetEstablishmentByIdResponse> =
      await axios.get(`/${url.api.establishments}/${establishmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error descargando datos del establecimiento')
  } catch (error) {
    throw error
  }
}

export const updateEstablishmentById = async (
  establishmentId: number,
  updateEstablishment: Partial<Omit<UpdateEstablishment, 'id'>>,
  token: string
): Promise<true | undefined> => {
  try {
    const axiosResponse = await axios.patch(
      `/${url.api.establishments}/${establishmentId}`,
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
  } catch (error) {
    throw error
  }
}
