import { useContext } from 'react'

import { EmployeeContext } from '../contexts/EmployeeContext'

import PageLogin from '../routes/PageLogin'
import PageDisabled from '../routes/PageDisabled'

const ForceLogin = ({ children }: { children: React.ReactNode }) => {
  const employeeContext = useContext(EmployeeContext)
  if (!employeeContext?.employee) {
    return <PageLogin />
  }
  if (employeeContext.employee.enabled === false) {
    return <PageDisabled />
  }
  return children
}

export default ForceLogin
