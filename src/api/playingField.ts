import axios from './axios'

import { AxiosResponse } from 'axios'

import {
  NewPlayingField,
  PlayingField,
  UpdatePlayingField,
} from '../types/playingField'
import { CreatePlayingFieldResponse } from '../types/responses/CreatePlayingFieldResponse'
import { GetPlayingFieldByIdResponse } from '../types/responses/GetPlayingFieldByIdResponse'
import { GetPlayingFieldsResponse } from '../types/responses/GetPlayingFieldsResponse'
import { GetPlayingFieldsSchema } from '../types/schemas/GetPlayingFieldsSchema'
import { url } from '../url'

export const getPlayingFields = async (
  playingFieldsSchema: GetPlayingFieldsSchema,
  token: string
): Promise<PlayingField[] | undefined> => {
  const axiosResponse: AxiosResponse<GetPlayingFieldsResponse> =
    await axios.get(`/${url.api.playingFields}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...playingFieldsSchema },
    })
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data.rows
  }
  throw Error('Error descargando campos de juego')
}

export const getPlayingFieldById = async (
  playingFieldId: number,
  token: string
): Promise<PlayingField | undefined> => {
  const axiosResponse: AxiosResponse<GetPlayingFieldByIdResponse> =
    await axios.get(`/${url.api.playingFields}/${playingFieldId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data
  }
  throw new Error('Error descargando datos del campo de juego')
}

export const createPlayingField = async (
  playingField: NewPlayingField,
  token: string,
  returning: boolean = false
): Promise<PlayingField | true | undefined> => {
  const axiosResponse: AxiosResponse<CreatePlayingFieldResponse> =
    await axios.post(
      `/${url.api.playingFields}`,
      { ...playingField, returning },
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
  throw new Error('Error creando el campo de juego')
}

export const updatePlayingFieldById = async (
  playingFieldId: number,
  updatePlayingField: UpdatePlayingField,
  token: string
): Promise<true | undefined> => {
  const axiosResponse = await axios.patch(
    `/${url.api.playingFields}/${playingFieldId}`,
    { ...updatePlayingField },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (axiosResponse.status === 204) {
    return true
  }
  throw new Error('Error actualizando datos del campo de juego')
}
