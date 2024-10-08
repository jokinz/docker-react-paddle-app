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

import {
  Employee,
  EmployeeRoleResponse,
  UpdateEmployee,
} from '../../types/employee'

import { updateEmployeeById } from '../../api/employees/employee'

import { areValuesDifferent, getDifferences } from '../../utils'

import { EmployeeContext } from '../../contexts/EmployeeContext'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'
import GridTitle from '../GridTitle'

type props = {
  employee: Employee
  updateEmployee: (updatedEmployee: Employee) => void
  employeeRoles: EmployeeRoleResponse[]
}

const EmployeeDetails = ({
  employee,
  updateEmployee,
  employeeRoles,
}: props) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token
  const initialEmployee = useRef(employee)
  const [newPassword, setNewPassword] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const handleUpdateButtonClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const isEmployeeValid = (): boolean => {
    if (
      employee.firstName === '' ||
      employee.lastName === '' ||
      employee.email === ''
    ) {
      return false
    } else {
      return true
    }
  }

  const handleConfirmationClick = async () => {
    const oldEmployee: UpdateEmployee = {
      roleId: initialEmployee.current.role.id,
      firstName: initialEmployee.current.firstName,
      lastName: initialEmployee.current.lastName,
      email: initialEmployee.current.email,
      enabled: initialEmployee.current.enabled,
    }
    const newEmployee: UpdateEmployee = {
      roleId: employee.role.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      enabled: employee.enabled,
    }
    const newEmployeeData: UpdateEmployee =
      newPassword === ''
        ? { ...getDifferences(oldEmployee, newEmployee) }
        : { ...getDifferences(oldEmployee, newEmployee), password: newPassword }
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        const result = await updateEmployeeById(
          employee.id,
          newEmployeeData,
          token
        )
        if (result) {
          enqueueSnackbar('Trabajador actualizado', { variant: 'success' })
          setShowModal(false)
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
    updateEmployee({
      ...employee,
      role: { ...employee.role, id: parseInt(event.target.value) },
    })
  }

  const handleEnabledClick = () => {
    const updatedEnabled = !employee.enabled
    const updatedEmployee = { ...employee, enabled: updatedEnabled }
    updateEmployee(updatedEmployee)
  }

  return (
    <DetailsWrapper>
      <GridTitle>Actualizar trabajador</GridTitle>
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
      <Grid item xs={12}>
        <TextField
          type="password"
          id="newPassword"
          label="Nueva contraseña"
          variant="filled"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value)
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
            {employeeRoles.map((role, index) => (
              <MenuItem key={index} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
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
          disabled={
            (!areValuesDifferent(employee, initialEmployee.current) ||
              !isEmployeeValid()) &&
            newPassword === ''
          }
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
          {'¿Actualizar el trabajador?'}
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
