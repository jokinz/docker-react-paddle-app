import { useContext } from 'react'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { Button } from '@mui/material'

const ButtonLogout = () => {
  const employeeContext = useContext(EmployeeContext)
  const handleLogoutClick = () => {
    employeeContext?.setEmployee(null)
  }
  return (
    <div>
      <Button onClick={handleLogoutClick} color="error" variant="outlined">
        Cerrar sesión
      </Button>
    </div>
  )
}

export default ButtonLogout
