import { useContext, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { createEmployeeWithResponse } from '../../api/employees/employee'

import { NewEmployee } from '../../types/employee'

import { EmployeeContext } from '../../contexts/EmployeeContext'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'

const starterNewEmployee: NewEmployee = {
  firstName: '',
  lastName: '',
  email: '',
  roleId: 0,
  password: '',
}

const EmployeeCreate = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [employee, setEmployee] = useState<NewEmployee>(starterNewEmployee)

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const resetEmployee = () => {
    setEmployee(starterNewEmployee)
  }

  const handleCreateClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleRoleTypeChange = (event: SelectChangeEvent) => {
    setEmployee({ ...employee, roleId: parseInt(event.target.value) })
  }

  // TODO: add validation for data
  const isEmployeeValid = (): boolean => {
    if (
      employee.email === '' ||
      employee.password === '' ||
      employee.firstName === '' ||
      employee.lastName === '' ||
      employee.roleId === 0
    ) {
      return false
    } else {
      return true
    }
  }

  const handleConfirmationClick = async () => {
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        const response = await createEmployeeWithResponse(employee, token)
        if (response) {
          setShowModal(false)
          enqueueSnackbar('Trabajador creado', { variant: 'success' })
          resetEmployee()
        }
      }
    } catch (error: any) {
      if (error.response.data.message) {
        enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
      } else {
        enqueueSnackbar('Error creando trabajador', { variant: 'error' })
      }
    } finally {
      setShowModal(false)
      setUpdateLoading(false)
    }
  }
  return (
    <DetailsWrapper>
      <Grid textAlign={'center'} item xs={12}>
        <h1>Crear Trabajador</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="firstName"
          label="Nombre"
          variant="filled"
          value={employee.firstName}
          onChange={(e) => {
            setEmployee({ ...employee, firstName: e.target.value })
          }}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="lastName"
          label="Apellido"
          variant="filled"
          value={employee.lastName}
          onChange={(e) => {
            setEmployee({ ...employee, lastName: e.target.value })
          }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="email"
          id="email"
          label="Correo electrónico"
          variant="filled"
          value={employee.email}
          onChange={(e) => {
            setEmployee({ ...employee, email: e.target.value })
          }}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="password"
          id="password"
          label="Contraseña"
          variant="filled"
          value={employee.password}
          onChange={(e) => {
            setEmployee({ ...employee, password: e.target.value })
          }}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-label">
            Rol del trabajador
          </InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={employee.roleId.toString()}
            label="Tipo"
            onChange={handleRoleTypeChange}
          >
            <MenuItem disabled value={0}>
              ---
            </MenuItem>
            <MenuItem value={1}>Recepción</MenuItem>
            <MenuItem value={2}>Operador</MenuItem>
            <MenuItem value={3}>Administrador</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!isEmployeeValid()}
          variant="contained"
          onClick={handleCreateClick}
        >
          Crear
        </Button>
      </Grid>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'¿Crear trabajador?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nombre: {employee.firstName} {employee.lastName}
            <br />
            Correo: {employee.email}
            <br />
            Rol:
            {employee.roleId === 1
              ? 'Recepción'
              : employee.roleId === 2
              ? 'Operador'
              : 'Administrador'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={updateLoading}
            onClick={handleConfirmationClick}
            autoFocus
          >
            <LoadingWrapper loading={updateLoading}> </LoadingWrapper>
            Sí, crear
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </DetailsWrapper>
  )
}

export default EmployeeCreate
