import { EmployeeRole } from "./employeeRole"

export type Employee = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: EmployeeRole
  enabled: boolean
}
