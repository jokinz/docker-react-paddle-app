import { useContext, useRef, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { Employee, EmployeeRole } from '../../types/employee'

import { updateEmployeeById } from '../../api/employees/employee'

import { areValuesDifferent, getDifferences } from '../../utils'

import { EmployeeContext } from '../../contexts/EmployeeContext'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'

type props = {
  employee: Employee
  updateEmployee: (updatedEmployee: Employee) => void
}

const EmployeeDetails = ({ employee, updateEmployee }: props) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const initialEmployee = useRef(employee)

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const handleUpdateButtonClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleConfirmationClick = async () => {
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        const result = await updateEmployeeById(
          employee.id,
          getDifferences(initialEmployee.current, employee),
          token
        )
        if (result) {
          setShowModal(false)
          enqueueSnackbar('Trabajador actualizado', { variant: 'success' })
        }
      }
    } catch (error) {
      enqueueSnackbar('Error actualizando', { variant: 'error' })
    } finally {
      setShowModal(false)
      setUpdateLoading(false)
    }
  }

  const handleRoleTypeChange = (event: SelectChangeEvent) => {
    const id: number = parseInt(event.target.value)
    const roleName: string =
      id === 1 ? 'Recepción' : id === 2 ? 'Operador' : 'Administrador'
    const accessLevel: string =
      id === 1 ? 'Counter' : id === 2 ? 'Operator' : 'Admin'
    const newRole: EmployeeRole = { id, roleName, accessLevel }
    updateEmployee({ ...employee, role: newRole })
  }

  const handleEnabledClick = async () => {
    const updatedEnabled = !employee.enabled
    const updatedEmployee = { ...employee, enabled: updatedEnabled }
    updateEmployee(updatedEmployee)
  }

  return (
    <DetailsWrapper>
      <Grid textAlign={'center'} item xs={12}>
        <h1>Actualizar trabajador</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="firstName"
          label="Nombre"
          variant="filled"
          value={employee.firstName}
          onChange={(e) => {
            updateEmployee({ ...employee, firstName: e.target.value })
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="lastName"
          label="Apellido"
          variant="filled"
          value={employee.lastName}
          onChange={(e) => {
            updateEmployee({ ...employee, lastName: e.target.value })
          }}
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
            updateEmployee({ ...employee, email: e.target.value })
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-label">
            Rol del trabajador
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={employee.role.id.toString()}
            label="Tipo"
            onChange={handleRoleTypeChange}
          >
            <MenuItem value={1}>Recepción</MenuItem>
            <MenuItem value={2}>Operador</MenuItem>
            <MenuItem value={3}>Administrador</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch
              aria-label="Activado"
              checked={employee.enabled}
              onClick={handleEnabledClick}
            />
          }
          label="Activado"
          labelPlacement="start"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!areValuesDifferent(employee, initialEmployee.current)}
          variant="contained"
          onClick={handleUpdateButtonClick}
        >
          Actualizar trabajador
        </Button>
      </Grid>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'¿Actualizar el estado del trabajador?'}
        </DialogTitle>
        <DialogActions>
          <Button
            disabled={updateLoading}
            onClick={handleConfirmationClick}
            autoFocus
          >
            <LoadingWrapper loading={updateLoading}> </LoadingWrapper>
            Sí, actualizar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </DetailsWrapper>
  )
}

export default EmployeeDetails
