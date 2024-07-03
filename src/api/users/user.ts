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

export const createUser = async (user: UserType) => {
  try {
    const response: UserType = await emulateApiCall(
      userExample,
      'success',
      user
    )
    if (response) {
      return response
    }
    throw new Error('Error creando usuario')
  } catch (error) {
    console.error(error)
  }
}

export const resetPassword = async (email: string) => {
  try {
    const response = await emulateApiCall(email, 'success')
    if (response) {
      return response
    }
    throw new Error('Error reiniciando contraseña')
  } catch (error) {
    console.error(error)
  }
}
