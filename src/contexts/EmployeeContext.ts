import { createContext } from 'react'

import { Employee } from '../types/employee'

export type EmployeeContextType = {
  employee: Employee | null
  setEmployee: (newValue: Employee | null) => void
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
)
