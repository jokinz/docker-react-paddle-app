import { useContext } from 'react'

import { redirect } from 'react-router-dom'

import { UserContext } from '../contexts/UserContext'
import PageLogin from '../routes/PageLogin'

const ForceLogin = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(UserContext)
  if (!user) {
    return <PageLogin />
  }
  return children
}

export default ForceLogin
