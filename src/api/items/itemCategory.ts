import axios from '../axios'

import { AxiosResponse } from 'axios'

import { ItemCategory } from '../../types/item'
import { GetItemCategoriesResponse } from '../../types/responses/GetItemCategoriesResponse'
import { CreateItemCategorySchema } from '../../types/schemas/CreateItemCategorySchema'
import { CreateItemCategoryResponse } from '../../types/responses/CreateItemCategoryResponse'

export const getAllItemCategories = async (
  token: string
): Promise<ItemCategory[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetItemCategoriesResponse> =
      await axios.get('/item-categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data.rows
    }
    throw new Error('Error descargando las categorías')
  } catch (error) {}
}

export const createItemCategoryWithResponse = async (
  itemCategory: CreateItemCategorySchema,
  token: string
): Promise<ItemCategory | undefined> => {
  try {
    const axiosResponse: AxiosResponse<CreateItemCategoryResponse> =
      await axios.post(
        `/item-categories`,
        { ...itemCategory, returning: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error creando la categoría')
  } catch (error) {}
}

export const createItemCategoryNoResponse = async (
  itemCategory: CreateItemCategorySchema,
  token: string
): Promise<true | undefined> => {
  try {
    const axiosResponse: AxiosResponse<CreateItemCategoryResponse> =
      await axios.post(
        `/item-categories`,
        { ...itemCategory, returning: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    if (axiosResponse.status === 204) {
      return true
    }
    throw new Error('Error creando la categoría')
  } catch (error) {}
}
