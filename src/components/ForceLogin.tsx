import { useContext } from 'react'

import { EmployeeContext } from '../contexts/EmployeeContext'

import PageDashboard from '../routes/PageDashboard'
import PageDisabled from '../routes/PageDisabled'
import PageLogin from '../routes/PageLogin'

const ForceLogin = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode
  requiredRole?: (2 | 3)[]
}) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token
  if (!employeeContext?.employee || !token) {
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
  return children
}

export default ForceLogin
