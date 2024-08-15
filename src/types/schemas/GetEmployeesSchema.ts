export type GetEmployeesSchema = {
  search: string
  includeDisabled: 0 | 1
  roleId?: 1 | 2 | 3
  records?: number
  page?: number
}
