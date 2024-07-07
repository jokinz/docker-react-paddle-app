import { createContext } from 'react'

import { Employee } from '../types/employee'

export type EmployeeContextType = Employee | null

export const EmployeeContext = createContext<EmployeeContextType>(null)
