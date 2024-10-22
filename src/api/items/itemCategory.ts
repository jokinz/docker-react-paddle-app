import axios from '../axios'

import { AxiosResponse } from 'axios'

import { ItemCategory, NewItemCategory } from '../../types/item'
import { CreateItemCategoryResponse } from '../../types/responses/CreateItemCategoryResponse'
import { GetItemCategoriesResponse } from '../../types/responses/GetItemCategoriesResponse'
import { GetItemCategoryByIdResponse } from '../../types/responses/GetItemCategoryByIdResponse'
import { url } from '../../url'

export const getAllItemCategories = async (
  token: string
): Promise<ItemCategory[] | undefined> => {
  const axiosResponse: AxiosResponse<GetItemCategoriesResponse> =
    await axios.get(`/${url.api.itemCategories}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data.rows
  }
  throw new Error('Error descargando las categorías')
}

export const getItemCategoryById = async (
  itemCategoryId: number,
  token: string
): Promise<ItemCategory | undefined> => {
  const axiosResponse: AxiosResponse<GetItemCategoryByIdResponse> =
    await axios.get(`/${url.api.itemCategories}/${itemCategoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data
  }
  throw new Error('Error descargando datos de la cateogría')
}

export const createItemCategory = async (
  itemCategory: NewItemCategory,
  token: string,
  returning: boolean = false
): Promise<ItemCategory | true | undefined> => {
  const axiosResponse: AxiosResponse<CreateItemCategoryResponse> =
    await axios.post(
      `/${url.api.itemCategories}`,
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
}

export const updateItemCategoryById = async (
  itemCategoryId: number,
  itemCategory: Partial<ItemCategory>,
  token: string
): Promise<true | undefined> => {
  const axiosResponse = await axios.patch(
    `/${url.api.itemCategories}/${itemCategoryId}`,
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
}
