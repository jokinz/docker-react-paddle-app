import axios from '../axios'

import { AxiosResponse } from 'axios'

import { GetUsersSchema } from '../../types/schemas/GetUsersSchema'
import { User as UserType } from '../../types/user'
import { GetUsersResponse } from '../../types/responses/GetUsersResponse'
import { GetUserByIdResponse } from '../../types/responses/GetUserByIdResponse'

export const getUsers = async (
  usersSchema: GetUsersSchema,
  token: string
): Promise<UserType[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetUsersResponse> = await axios.get(
      '/users',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { ...usersSchema },
      }
    )
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data.rows
    }
    throw new Error('Error buscando usuarios')
  } catch (error) {
    throw error
  }
}

export const getUserById = async (
  userId: number,
  token: string
): Promise<UserType | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetUserByIdResponse> = await axios.get(
      `/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error descargando datos de usuario')
  } catch (error) {
    throw error
  }
}

export const updateUserById = async (
  userId: number,
  user: Partial<UserType>,
  token: string
): Promise<true | undefined> => {
  try {
    const axiosResponse = await axios.patch(
      `/users/${userId}`,
      { ...user },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (axiosResponse.status === 204) {
      return true
    }
    throw new Error('Error actualizando datos de usuario')
  } catch (error) {
    throw error
  }
}
