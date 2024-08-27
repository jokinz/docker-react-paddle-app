import axios from '../axios'

import { AxiosResponse } from 'axios'

import { Item as ItemType, UpdateItem } from '../../types/item'
import { CreateItemResponse } from '../../types/responses/CreateItemResponse'
import { GetItemByIdResponse } from '../../types/responses/GetItemByIdResponse'
import { GetItemsResponse } from '../../types/responses/GetItemsResponse'
import { CreateItemSchema } from '../../types/schemas/CreateItemSchema'
import { GetItemsSchema } from '../../types/schemas/GetItemsSchema'

export const getItems = async (
  itemsSchema: GetItemsSchema,
  token: string
): Promise<ItemType[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetItemsResponse> = await axios.get(
      '/items',
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
  } catch (error) {
    throw error
  }
}

export const getItemById = async (
  itemId: number,
  token: string
): Promise<ItemType | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetItemByIdResponse> = await axios.get(
      `/items/${itemId}`,
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
  } catch (error) {
    throw error
  }
}

export const createItem = async (
  item: CreateItemSchema,
  token: string,
  returning: boolean = false
): Promise<ItemType | true | undefined> => {
  try {
    const axiosResponse: AxiosResponse<CreateItemResponse> = await axios.post(
      `/items`,
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
  } catch (error) {
    throw error
  }
}

export const updateItemById = async (
  itemId: number,
  updateItem: UpdateItem,
  token: string
): Promise<true | undefined> => {
  try {
    const axiosResponse = await axios.patch(
      `/items/${itemId}`,
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
  } catch (error) {
    throw error
  }
}
