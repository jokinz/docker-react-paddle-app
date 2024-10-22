import axios from '../axios'

import { AxiosResponse } from 'axios'

import { Employee as EmployeeType } from '../../types/employee'
import { CreateEmployeeResponse } from '../../types/responses/CreateEmployeeResponse'
import { GetEmployeesResponse } from '../../types/responses/GetEmployeesResponse'
import { CreateEmployeeSchema } from '../../types/schemas/CreateEmployeeSchema'
import { GetEmployeesSchema } from '../../types/schemas/GetEmployeesSchema'
import { GetEmployeeByIdResponse } from '../../types/responses/GetEmployeeByIdResponse'
import { url } from '../../url'

export const getEmployees = async (
  employeesSchema: GetEmployeesSchema,
  token: string
): Promise<EmployeeType[] | undefined> => {
  const axiosResponse: AxiosResponse<GetEmployeesResponse> = await axios.get(
    `/${url.api.employees}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...employeesSchema },
    }
  )
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data.rows
  }
  throw Error('Error buscando trabajadores')
}

export const getEmployeeById = async (
  employeeId: number,
  token: string
): Promise<EmployeeType | undefined> => {
  const axiosResponse: AxiosResponse<GetEmployeeByIdResponse> =
    await axios.get(`/${url.api.employees}/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
    return axiosResponse.data.data
  }
  throw Error('Error descargando datos de empleado')
}

export const createEmployee = async (
  employee: CreateEmployeeSchema,
  token: string,
  returning: boolean = false
): Promise<EmployeeType | true | undefined> => {
  const axiosResponse: AxiosResponse<CreateEmployeeResponse> =
    await axios.post(
      `/${url.api.employees}`,
      { ...employee, returning },
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
}

export const updateEmployeeById = async (
  employeeId: number,
  employee: Partial<EmployeeType>,
  token: string
): Promise<true | undefined> => {
  const axiosResponse = await axios.patch(
    `/${url.api.employees}/${employeeId}`,
    { ...employee },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (axiosResponse.status === 204) {
    return true
  }
  throw Error('Error actualizando datos de trabajador')
}
