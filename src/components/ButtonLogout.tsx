import { useContext, useState } from 'react'

import { Button } from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { emulateApiCall } from '../api/dummy'

import LoadingWrapper from './LoadingWrapper'

const ButtonLogout = () => {
  const employeeContext = useContext(EmployeeContext)
  const [loading, setLoading] = useState(false)
  const handleLogoutClick = async () => {
    setLoading(true)
    try {
      const response = await emulateApiCall(
        employeeContext?.employee,
        'success'
      )
      if (response) {
        employeeContext?.setEmployee(null)
      }
    } catch (error) {
      enqueueSnackbar('Error al cerrar la sesión', { variant: 'error' })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <Button onClick={handleLogoutClick} color="error" variant="outlined">
        <LoadingWrapper loading={loading}>Cerrar sesión</LoadingWrapper>
      </Button>
    </div>
  )
}

export default ButtonLogout
