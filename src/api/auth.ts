import { AuthResponse } from '../types/responses/AuthResponse'
import { url } from '../url'
import axios from './axios'

export const auth = async (
  email: string,
  password: string,
  type: string = 'Employee'
): Promise<AuthResponse | undefined> => {
  try {
    const axiosResponse = await axios.post(`/${url.api.auth}`, {
      email,
      password,
      type,
    })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data
    }
    throw new Error()
  } catch (error) {
    return
  }
}
