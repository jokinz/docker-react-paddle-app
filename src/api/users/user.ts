import { User as UserType } from '../../types/user'
import { emulateApiCall, userExample, usersListExample } from '../dummy'

export const getUserById = async (
  id: number
): Promise<UserType | undefined> => {
  try {
    const response: UserType = await emulateApiCall(userExample, 'success', id)
    if (response) {
      return response
    }
    throw new Error('Error descargando datos de usuario')
  } catch (error) {
    console.error(error)
  }
  return
}

export const getUserByDocument = async (
  id: number
): Promise<UserType | undefined> => {
  try {
    const response: UserType = await emulateApiCall(userExample, 'success', id)
    if (response) {
      return response
    }
    throw new Error('Error descargando datos de usuario')
  } catch (error) {
    console.error(error)
  }
  return
}

// TODO: update response type
export const updateUserById = async (user: UserType): Promise<any> => {
  try {
    const response = await emulateApiCall(user, 'success')
    if (response) {
      return response
    }
    throw new Error('Error actualizando datos de usuario')
  } catch (error) {
    console.error(error)
  }
  return
}

export const getAllUsers = async (): Promise<UserType[] | undefined> => {
  try {
    const response: UserType[] = await emulateApiCall(
      usersListExample,
      'success'
    )
    if (response) {
      return response
    }
    throw new Error('Error descargando usuarios')
  } catch (error) {
    console.error(error)
  }
}
