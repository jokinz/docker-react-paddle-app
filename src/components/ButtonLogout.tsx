import { useContext } from 'react'

import { Button } from '@mui/material'

import { useCookies } from 'react-cookie'

import { BOHEMIA_PADEL_JWT } from '../types/userCookie'

import { EmployeeContext } from '../contexts/EmployeeContext'

const ButtonLogout = () => {
  const employeeContext = useContext(EmployeeContext)

  const [, , removeCookie] = useCookies([BOHEMIA_PADEL_JWT])

  const handleLogoutClick = () => {
    removeCookie(BOHEMIA_PADEL_JWT)
    employeeContext?.setEmployee(null)
  }
  return (
    <Button onClick={handleLogoutClick} color="error" variant="outlined">
      Cerrar sesión
    </Button>
  )
}

export default ButtonLogout
