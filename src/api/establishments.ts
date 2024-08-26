import axios from './axios'

import { AxiosResponse } from 'axios'

import { Establishment } from '../types/establishment'
import { GetEstablishmentsResponse } from '../types/responses/GetEstablishmentsResponse'

export const getAllEstablishments = async (
  token: string
): Promise<Pick<Establishment, 'id' | 'name'>[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetEstablishmentsResponse> =
      await axios.get('/establishments/value', {
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
