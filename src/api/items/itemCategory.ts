import axios from '../axios'

import { AxiosResponse } from 'axios'

import { ItemCategory, NewItemCategory } from '../../types/item'
import { CreateItemCategoryResponse } from '../../types/responses/CreateItemCategoryResponse'
import { GetItemCategoriesResponse } from '../../types/responses/GetItemCategoriesResponse'
import { GetItemCategoryByIdResponse } from '../../types/responses/GetItemCategoryByIdResponse'

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
  } catch (error) {
    throw error
  }
}

export const getItemCategoryById = async (
  itemCategoryId: number,
  token: string
): Promise<ItemCategory | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetItemCategoryByIdResponse> =
      await axios.get(`/item-categories/${itemCategoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error descargando datos de la cateogría')
  } catch (error) {
    throw error
  }
}

export const createItemCategory = async (
  itemCategory: NewItemCategory,
  token: string,
  returning: boolean = false
): Promise<ItemCategory | true | undefined> => {
  try {
    const axiosResponse: AxiosResponse<CreateItemCategoryResponse> =
      await axios.post(
        `/item-categories`,
        { ...itemCategory, returning },
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
    throw new Error('Error creando la categoría')
  } catch (error) {
    throw error
  }
}

export const updateItemCategoryById = async (
  itemCategoryId: number,
  itemCategory: Partial<ItemCategory>,
  token: string
): Promise<true | undefined> => {
  try {
    const axiosResponse = await axios.patch(
      `/itemCategorys/${itemCategoryId}`,
      { ...itemCategory },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (axiosResponse.status === 204) {
      return true
    }
    throw Error('Error actualizando datos de categoría')
  } catch (error) {
    throw error
  }
}
