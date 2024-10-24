import axios from '../axios'

import { AxiosResponse } from 'axios'

import { GetUsersSchema } from '../../types/schemas/GetUsersSchema'
import { User as UserType } from '../../types/user'
import { GetUsersResponse } from '../../types/responses/GetUsersResponse'
import { GetUserByIdResponse } from '../../types/responses/GetUserByIdResponse'
import { url } from '../../url'

export const getUsers = async (
  usersSchema: GetUsersSchema,
  token: string
): Promise<UserType[] | undefined> => {
  const axiosResponse: AxiosResponse<GetUsersResponse> = await axios.get(
    `/${url.api.users}`,
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
}

export const getUserById = async (
  userId: number,
  token: string
): Promise<UserType | undefined> => {
  const axiosResponse: AxiosResponse<GetUserByIdResponse> = await axios.get(
    `/${url.api.users}/${userId}`,
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
}

export const updateUserById = async (
  userId: number,
  user: Partial<UserType>,
  token: string
): Promise<true | undefined> => {
  const axiosResponse = await axios.patch(
    `/${url.api.users}/${userId}`,
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
}
