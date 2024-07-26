import { EmployeeRole } from "./employeeRole"

export type Employee = {
  id: number
  role: EmployeeRole
  firstName: string
  lastName: string
  enabled: boolean
}
