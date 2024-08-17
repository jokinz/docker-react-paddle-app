import { useContext } from 'react'

import { EmployeeContext } from '../contexts/EmployeeContext'

import PageLogin from '../routes/PageLogin'
import PageDisabled from '../routes/PageDisabled'
import PageDashboard from '../routes/PageDashboard'

const ForceLogin = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode
  requiredRole?: (2 | 3)[]
}) => {
  const employeeContext = useContext(EmployeeContext)
  if (employeeContext) {
    if (!employeeContext.employee) {
      return <PageLogin />
    } else {
      const userRoleId = employeeContext.employee.role.id
      if (requiredRole && !requiredRole.find((id) => id === userRoleId)) {
        return <PageDashboard />
      }
    }

    if (employeeContext.employee.enabled === false) {
      return <PageDisabled />
    }
  }
  return children
}

export default ForceLogin
