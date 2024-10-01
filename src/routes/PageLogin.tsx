import { useContext, useState } from 'react'

import { Box, Button, Grid, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Navigate } from 'react-router-dom'

import { enqueueSnackbar } from 'notistack'

import { useCookies } from 'react-cookie'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { BOHEMIA_PADEL_JWT, UserCookie } from '../types/userCookie'

import { auth } from '../api/auth'

import LoadingWrapper from '../components/LoadingWrapper'
import GridTitle from '../components/GridTitle'

const PageLogin = () => {
  const employeeContext = useContext(EmployeeContext)

  const theme = useTheme()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const [, setCookie] = useCookies([BOHEMIA_PADEL_JWT])

  if (employeeContext?.employee) {
    return <Navigate to="/" />
  }

  const handleLoginClick = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await auth(email, password)
      if (response) {
        const cookieData: UserCookie = {
          token: response.data.token,
          data: response.data.employee,
        }
        setCookie(BOHEMIA_PADEL_JWT, cookieData, { maxAge: 604800 })
      }
      throw Error
    } catch (error) {
      enqueueSnackbar('Error al iniciar sesión', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      justifyContent={'center'}
      alignItems={'center'}
      display={'flex'}
      height={'100vh'}
    >
      <Grid
        border={'1px solid'}
        borderColor={theme.palette.primary.light}
        borderRadius={5}
        padding={'1rem'}
        container
        rowGap={4}
        maxWidth={'30rem'}
      >
        <GridTitle>Bohemia Padle</GridTitle>
        <Grid item xs={12}>
          <TextField
            type="email"
            id="email"
            label="Correo electrónico"
            variant="filled"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            id="password"
            label="Contraseña"
            variant="filled"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <Button
            variant="contained"
            onClick={() => handleLoginClick(email, password)}
            fullWidth
            disabled={loading}
          >
            <LoadingWrapper loading={loading}>Iniciar Sesión</LoadingWrapper>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            disabled={loading}
          >
            <LoadingWrapper loading={loading}>
              Iniciar Sesión c/deshabilitado
            </LoadingWrapper>
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PageLogin
