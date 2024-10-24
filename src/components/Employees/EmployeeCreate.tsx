import { useContext, useEffect, useState } from 'react'

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
  TextField
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { createEmployee } from '../../api/employees/employee'

import { EmployeeRoleResponse, NewEmployee } from '../../types/employee'

import { getAllEmployeeRoles } from '../../api/employees/employeeRole'
import { EmployeeContext } from '../../contexts/EmployeeContext'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'
import GridTitle from '../GridTitle'

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
  const [employeeRoles, setEmployeeRoles] = useState<EmployeeRoleResponse[]>([])

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  useEffect(() => {
    const getEmployeeRoles = async () => {
      if (token) {
        try {
          const response = await getAllEmployeeRoles(token)
          if (response) {
            setEmployeeRoles(response)
          }
        } catch (error) {
          enqueueSnackbar(`Error cargando los roles`, { variant: 'error' })
        }
      }
    }
    getEmployeeRoles()
  }, [])

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
        const response = await createEmployee(employee, token)
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
      <GridTitle>Crear Trabajador</GridTitle>
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
          fullWidth
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
          fullWidth
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
      <Grid item xs={3}>
        <FormControl variant="standard" fullWidth>
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
            {employeeRoles.map((role, index) => (
              <MenuItem key={index} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
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
