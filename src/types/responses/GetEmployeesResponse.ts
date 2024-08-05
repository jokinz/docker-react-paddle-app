import { Employee } from "../employee"
import { Pagination } from "../pagination"

export type GetEmployeesResponse = {
    message: string
    statusCode: number
    data: {
      rows: Employee[]
      pagination: Pagination
    }
  }
  