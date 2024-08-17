import { useContext } from 'react'

import { useCookies } from 'react-cookie'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { BOHEMIA_PADEL_JWT } from '../types/userCookie'

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
  const [cookies] = useCookies([BOHEMIA_PADEL_JWT])
  const token = cookies[BOHEMIA_PADEL_JWT]?.token
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
