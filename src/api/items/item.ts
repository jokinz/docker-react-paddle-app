import axios from '../axios'

import { AxiosResponse } from 'axios'

import { Item as ItemType, UpdateItem } from '../../types/item'
import { CreateItemResponse } from '../../types/responses/CreateItemResponse'
import { GetItemByIdResponse } from '../../types/responses/GetItemByIdResponse'
import { GetItemsResponse } from '../../types/responses/GetItemsResponse'
import { CreateItemSchema } from '../../types/schemas/CreateItemSchema'
import { GetItemsSchema } from '../../types/schemas/GetItemsSchema'
import { url } from '../../url'

export const getItems = async (
  itemsSchema: GetItemsSchema,
  token: string
): Promise<ItemType[] | undefined> => {
  const axiosResponse: AxiosResponse<GetItemsResponse> = await axios.get(
    `/${url.api.items}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...itemsSchema },
    }
  )
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data.rows
  }
  throw new Error('Error buscando items')
}

export const getItemById = async (
  itemId: number,
  token: string
): Promise<ItemType | undefined> => {
  const axiosResponse: AxiosResponse<GetItemByIdResponse> = await axios.get(
    `/${url.api.items}/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data
  }
  throw new Error('Error descargando datos del item')
}

export const createItem = async (
  item: CreateItemSchema,
  token: string,
  returning: boolean = false
): Promise<ItemType | true | undefined> => {
  const axiosResponse: AxiosResponse<CreateItemResponse> = await axios.post(
    `/${url.api.items}`,
    { ...item, returning },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (axiosResponse.status === 204) {
    return true
  }
  if (
    returning &&
    axiosResponse.status === 200 &&
    axiosResponse.data.statusCode === 200
  ) {
    return axiosResponse.data.data
  }
  throw new Error('Error creando el item')
}

export const updateItemById = async (
  itemId: number,
  updateItem: UpdateItem,
  token: string
): Promise<true | undefined> => {
  const axiosResponse = await axios.patch(
    `/${url.api.items}/${itemId}`,
    { ...updateItem },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (axiosResponse.status === 204) {
    return true
  }
  throw new Error('Error actualizando datos del item')
}
