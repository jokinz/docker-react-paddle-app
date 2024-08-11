import { Employee } from '../employee'

export type AuthResponse = {
  message: string
  statusCode: number
  data: {
    token: string
    employee: Employee
  }
}
