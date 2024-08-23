import axios from '../axios'

import { AxiosResponse } from 'axios'

import { ItemCategory } from '../../types/item'
import { GetItemCategoriesResponse } from '../../types/responses/GetItemCategoriesResponse'
export const getAllItemCategories = async (
  token: string
): Promise<ItemCategory[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetItemCategoriesResponse> =
      await axios.get('/item-categories/value', {
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
