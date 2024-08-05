import { Employee } from '../employee'

export type GetEmployeeByIdResponse = {
  message: string
  statusCode: number
  data: Employee
}
