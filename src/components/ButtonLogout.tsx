import { useState } from 'react'

import { Button } from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { useCookies } from 'react-cookie'

import { BOHEMIA_PADEL_JWT } from '../types/userCookie'

import LoadingWrapper from './LoadingWrapper'

const ButtonLogout = () => {
  const [loading, setLoading] = useState(false)

  const [, , removeCookie] = useCookies([BOHEMIA_PADEL_JWT])

  const handleLogoutClick = async () => {
    setLoading(true)
    try {
      removeCookie(BOHEMIA_PADEL_JWT)
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
