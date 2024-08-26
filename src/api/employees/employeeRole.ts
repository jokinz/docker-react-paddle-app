import axios from '../axios'

import { AxiosResponse } from 'axios'

import { EmployeeRoleResponse } from '../../types/employee'
import { GetEmployeeRolesResponse } from '../../types/responses/GetEmployeeRolesResponse'

export const getAllEmployeeRoles = async (
  token: string
): Promise<EmployeeRoleResponse[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetEmployeeRolesResponse> =
      await axios.get('/roles/value', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error descargando los roles')
  } catch (error) {
    throw error
  }
}
