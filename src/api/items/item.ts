import { Item as ItemType } from '../../types/item'
import { emulateApiCall, itemExample, itemsListExample } from '../dummy'

export const getItemById = async (
  id: number
): Promise<ItemType | undefined> => {
  try {
    const response: ItemType = await emulateApiCall(itemExample, 'success', id)
    if (response) {
      return response
    }
    throw new Error('Error descargando datos del item')
  } catch (error) {
    console.error(error)
  }
  return
}

export const getItemByDocument = async (
  id: number
): Promise<ItemType | undefined> => {
  try {
    const response: ItemType = await emulateApiCall(itemExample, 'success', id)
    if (response) {
      return response
    }
    throw new Error('Error descargando datos del item')
  } catch (error) {
    console.error(error)
  }
  return
}

// TODO: update response type
export const updateItemById = async (item: ItemType): Promise<any> => {
  try {
    const response = await emulateApiCall(item, 'success')
    if (response) {
      return response
    }
    throw new Error('Error actualizando datos del item')
  } catch (error) {
    console.error(error)
  }
  return
}

export const updateItemEnabledById = async (
  item: ItemType
): Promise<ItemType | undefined> => {
  try {
    const enabled = item.enabled
    const response = await emulateApiCall(item, 'success', { ...item, enabled })
    if (response) {
      return response
    }
    throw new Error('Error actualizando el item')
  } catch (error) {
    console.error(error)
    return
  }
}

export const getAllItems = async (): Promise<ItemType[] | undefined> => {
  try {
    const response: ItemType[] = await emulateApiCall(
      itemsListExample,
      'success'
    )
    if (response) {
      return response
    }
    throw new Error('Error descargando items')
  } catch (error) {
    console.error(error)
  }
}
