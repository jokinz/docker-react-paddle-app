export type CreateEmployeeSchema = {
  firstName: string
  lastName: string
  email: string
  roleId: number
  password: string
  returning?: boolean
}
