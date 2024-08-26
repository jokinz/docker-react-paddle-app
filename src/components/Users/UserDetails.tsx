import { useContext, useRef, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
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

import { User } from '../../types/user'

import { updateUserById } from '../../api/users/user'

import { areValuesDifferent, getDifferences } from '../../utils'

import { EmployeeContext } from '../../contexts/EmployeeContext'
import { districtList } from '../../districtList'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'
import { useNavigate } from 'react-router-dom'

type props = {
  user: User
  updateUser: (updatedUser: User) => void
}

const UserDetails = ({ user, updateUser }: props) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token
  const navigate = useNavigate()
  const initialUser = useRef(user)

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
        const result = await updateUserById(
          user.id,
          getDifferences(initialUser.current, user),
          token
        )
        if (result) {
          setShowModal(false)
          enqueueSnackbar('Usuario actualizado', { variant: 'success' })
          navigate(`/users`)
        }
      }
    } catch (error) {
      enqueueSnackbar('Error actualizando', { variant: 'error' })
    } finally {
      setShowModal(false)
      setUpdateLoading(false)
    }
  }

  const handleDocumentTypeChange = (event: SelectChangeEvent) => {
    updateUser({ ...user, documentType: event.target.value })
  }
  const handleDistrictChange = (event: SelectChangeEvent) => {
    updateUser({ ...user, district: event.target.value })
  }

  return (
    <DetailsWrapper>
      <Grid textAlign={'center'} item xs={12}>
        <h1>Actualizar usuario</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="firstName"
          label="Nombre"
          variant="filled"
          value={user.firstName}
          onChange={(e) => {
            updateUser({ ...user, firstName: e.target.value })
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="lastName"
          label="Apellido"
          variant="filled"
          value={user.lastName}
          onChange={(e) => {
            updateUser({ ...user, lastName: e.target.value })
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="email"
          id="email"
          label="Correo electrónico"
          variant="filled"
          value={user.email}
          onChange={(e) => {
            updateUser({ ...user, email: e.target.value })
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-label">
            Tipo de documento
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.documentType}
            label="Tipo"
            onChange={handleDocumentTypeChange}
          >
            <MenuItem value={'DNI'}>DNI</MenuItem>
            <MenuItem value={'other'}>Otro</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="documentNumber"
          label="N° de documento"
          variant="filled"
          value={user.documentNumber}
          onChange={(e) => {
            updateUser({ ...user, documentNumber: e.target.value })
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-label">Distrito</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.district}
            label="Distrito"
            onChange={handleDistrictChange}
          >
            {districtList.map((district, index) => (
              <MenuItem key={index} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          type="tel"
          id="tel"
          label="Teléfono"
          variant="filled"
          value={user.phone}
          onChange={(e) => {
            updateUser({ ...user, phone: e.target.value })
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!areValuesDifferent(user, initialUser.current)}
          variant="contained"
          onClick={handleUpdateButtonClick}
        >
          Actualizar usuario
        </Button>
      </Grid>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'¿Actualizar el estado del usuario?'}
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

export default UserDetails
