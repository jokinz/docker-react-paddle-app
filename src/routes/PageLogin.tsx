import { useContext, useState } from 'react'

import { Box, Button, Grid, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Navigate } from 'react-router-dom'

import { EmployeeContext } from '../contexts/EmployeeContext'

import LoadingWrapper from '../components/LoadingWrapper'

import { employeeExample, emulateApiCall } from '../api/dummy'
import { Employee } from '../types/employee'

const PageLogin = () => {
  const employeeContext = useContext(EmployeeContext)

  const theme = useTheme()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false)

  if (employeeContext?.employee) {
    return <Navigate to="/" />
  }

  const handleLoginClick = async () => {
    setLoading(true)
    try {
      const response = await emulateApiCall(employeeExample, 'success')
      if (response) {
        employeeContext?.setEmployee(employeeExample)
      }
      console.log(response)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  const handleLoginClickAdmin = async () => {
    setLoading(true)
    try {
      const response = await emulateApiCall(
        { ...employeeExample, idRole: 3 },
        'success'
      )
      if (response) {
        employeeContext?.setEmployee(response as Employee)
      }
      console.log(response)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  const handleLoginClickOperator = async () => {
    setLoading(true)
    try {
      const response = await emulateApiCall(
        { ...employeeExample, idRole: 2 },
        'success'
      )
      if (response) {
        employeeContext?.setEmployee(response as Employee)
      }
      console.log(response)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  const handleLoginClickCounter = async () => {
    setLoading(true)
    try {
      const response = await emulateApiCall(
        { ...employeeExample, idRole: 1 },
        'success'
      )
      if (response) {
        employeeContext?.setEmployee(response as Employee)
      }
      console.log(response)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  const handleLoginClickDisabled = async () => {
    setLoading(true)
    try {
      const response = await emulateApiCall(
        { ...employeeExample, idRole: 3, enabled: false },
        'success'
      )
      if (response) {
        employeeContext?.setEmployee({
          ...employeeExample,
          idRole: 1,
          enabled: false,
        })
      }
      console.log(response)
    } catch (error) {
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
        <Grid item xs={12}>
          <h1 style={{ textAlign: 'center' }}>Bohemia Padle</h1>
        </Grid>
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
            onClick={handleLoginClick}
            fullWidth
            disabled={loading}
          >
            <LoadingWrapper loading={loading}>Iniciar Sesión</LoadingWrapper>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleLoginClickAdmin}
            fullWidth
            disabled={loading}
          >
            <LoadingWrapper loading={loading}>
              Iniciar Sesión c/Admin
            </LoadingWrapper>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleLoginClickOperator}
            fullWidth
            disabled={loading}
          >
            <LoadingWrapper loading={loading}>
              Iniciar Sesión c/Operario
            </LoadingWrapper>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleLoginClickCounter}
            fullWidth
            disabled={loading}
          >
            <LoadingWrapper loading={loading}>
              Iniciar Sesión c/Counter
            </LoadingWrapper>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleLoginClickDisabled}
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
