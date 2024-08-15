import axios from '../axios'

import { AxiosResponse } from 'axios'

import { Employee as EmployeeType } from '../../types/employee'
import { CreateEmployeeResponse } from '../../types/responses/CreateEmployeeResponse'
import { GetEmployeesResponse } from '../../types/responses/GetEmployeesResponse'
import { CreateEmployeeSchema } from '../../types/schemas/CreateEmployeeSchema'
import { GetEmployeesSchema } from '../../types/schemas/GetEmployeesSchema'
import { GetEmployeeByIdResponse } from '../../types/responses/GetEmployeeByIdResponse'

export const getEmployees = async (
  employeesSchema: GetEmployeesSchema,
  token: string
): Promise<EmployeeType[] | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetEmployeesResponse> = await axios.get(
      '/employees',
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
    throw new Error('Error buscando trabajadores')
  } catch (error) {}
}

export const getEmployeeById = async (
  employeeId: number,
  token: string
): Promise<EmployeeType | undefined> => {
  try {
    const axiosResponse: AxiosResponse<GetEmployeeByIdResponse> =
      await axios.get(`/employees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error descargando datos de empleado')
  } catch (error) {
    console.error(error)
  }
  return
}

export const createEmployeeWithResponse = async (
  employee: CreateEmployeeSchema,
  token: string
): Promise<EmployeeType | undefined> => {
  try {
    const axiosResponse: AxiosResponse<CreateEmployeeResponse> =
      await axios.post(
        `/employees`,
        { ...employee, returning: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    if (axiosResponse.status === 200 && axiosResponse.data.statusCode === 200) {
      return axiosResponse.data.data
    }
    throw new Error('Error creando el trabajador')
  } catch (error) {}
}

export const createEmployeeNoResponse = async (
  employee: CreateEmployeeSchema,
  token: string
): Promise<true | undefined> => {
  try {
    const axiosResponse: AxiosResponse<CreateEmployeeResponse> =
      await axios.post(
        `/employees`,
        { ...employee, returning: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    if (axiosResponse.status === 204) {
      return true
    }
    throw new Error('Error creando el trabajador')
  } catch (error) {}
}

export const updateEmployeeById = async (
  employeeId: number,
  employee: Partial<EmployeeType>,
  token: string
): Promise<true | undefined> => {
  try {
    const axiosResponse = await axios.patch(`/employees/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...employee },
    })
    if (axiosResponse.status === 200) {
      return true
    }
    throw new Error('Error actualizando datos de trabajador')
  } catch (error) {
    console.error(error)
  }
}

export const resetPassword = async (email: string) => {
  try {
    console.log(email)
  } catch (error) {
    console.error(error)
  }
}
