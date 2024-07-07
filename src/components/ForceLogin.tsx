import { useContext } from 'react'

import { EmployeeContext } from '../contexts/EmployeeContext'
import PageLogin from '../routes/PageLogin'

const ForceLogin = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(EmployeeContext)
  if (!user) {
    return <PageLogin />
  }
  return children
}

export default ForceLogin
