import { Employee as EmployeeType } from '../../types/employee'
import { emulateApiCall, employeeExample, employeesListExample } from '../dummy'

export const getEmployeeById = async (
  id: number
): Promise<EmployeeType | undefined> => {
  try {
    const employee: EmployeeType = employeeExample
    return employee
  } catch (error) {
    console.error(error)
  }
  return
}

export const getEmployeeByDocument = async (
  id: number
): Promise<EmployeeType | undefined> => {
  try {
    const employee: EmployeeType = await emulateApiCall(employeeExample, 'success', id)
    return employee
  } catch (error) {
    console.error(error)
  }
  return
}

export const getAllEmployees = async (): Promise<EmployeeType[] | undefined> => {
  try {
    const employeesList: EmployeeType[] = await emulateApiCall(
      employeesListExample,
      'success'
    )
    return employeesList
  } catch (error) {
    console.error(error)
  }
}

export const createEmployee = async (employee: EmployeeType) => {
  try {
    console.log(employee)
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
