import axios from './axios'

import { AxiosResponse } from 'axios'

import { PlayingField } from '../types/playingField'
import { GetPlayingFieldsResponse } from '../types/responses/GetPlayingFieldsResponse'
import { GetPlayingFieldsSchema } from '../types/schemas/GetPlayingFieldsSchema'

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
