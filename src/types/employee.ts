export type Employee = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: EmployeeRole
  enabled: boolean
}

export type NewEmployee = Pick<Employee, 'firstName' | 'lastName' | 'email'> & {
  password: string
  roleId: number
}

export type EmployeeRole = {
  id: number
  roleName: string
  accessLevel: string
}
