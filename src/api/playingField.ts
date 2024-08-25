import axios from './axios'

import { AxiosResponse } from 'axios'

import { PlayingField } from '../types/playingField'
import { GetPlayingFieldsResponse } from '../types/responses/GetPlayingFieldsResponse'
import { GetPlayingFieldsSchema } from '../types/schemas/GetPlayingFieldsSchema'
import { GetPlayingFieldByIdResponse } from '../types/responses/GetPlayingFieldByIdResponse'

export const getPlayingFields = async (
  playingFieldsSchema: GetPlayingFieldsSchema,
  token: string
): Promise<PlayingField[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetPlayingFieldsResponse> =
      await axios.get('/playing-fields', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { ...playingFieldsSchema },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data.rows
    }
    throw Error('Error descargando campos de juego')
  } catch (error) {
    throw error
  }
}

export const getPlayingFieldById = async (
  playingFieldId: number,
  token: string
): Promise<PlayingField | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetPlayingFieldByIdResponse> =
      await axios.get(`/playing-fields/${playingFieldId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error descargando datos del campo de juego')
  } catch (error) {}
  return
}

