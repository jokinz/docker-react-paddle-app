import { useMemo, useState } from 'react'

import { useCookies } from 'react-cookie'

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

import { BOHEMIA_PADEL_JWT } from '../../types/userCookie'

import { areValuesDifferent, getDifferences } from '../../utils'

import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'

type props = {
  user: User
  updateUser: (updatedUser: User) => void
}

const UserDetails = ({ user, updateUser }: props) => {
  const [cookies] = useCookies([BOHEMIA_PADEL_JWT])
  const token = cookies[BOHEMIA_PADEL_JWT].token

  const initialUser = useMemo(() => user, [])

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
      const result = await updateUserById(
        user.id,
        getDifferences(initialUser, user),
        token
      )
      if (result) {
        setShowModal(false)
        enqueueSnackbar('Usuario actualizado', { variant: 'success' })
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
            <MenuItem value={'Ancón'}>Ancón</MenuItem>
            <MenuItem value={'Ate'}>Ate</MenuItem>
            <MenuItem value={'Barranco'}>Barranco</MenuItem>
            <MenuItem value={'Breña'}>Breña</MenuItem>
            <MenuItem value={'Carabayllo'}>Carabayllo</MenuItem>
            <MenuItem value={'Chaclacayo'}>Chaclacayo</MenuItem>
            <MenuItem value={'Chorrillos'}>Chorrillos</MenuItem>
            <MenuItem value={'Cieneguilla'}>Cieneguilla</MenuItem>
            <MenuItem value={'Comas'}>Comas</MenuItem>
            <MenuItem value={'El Agustino'}>El Agustino</MenuItem>
            <MenuItem value={'Independencia'}>Independencia</MenuItem>
            <MenuItem value={'Jesús María'}>Jesús María</MenuItem>
            <MenuItem value={'La Molina'}>La Molina</MenuItem>
            <MenuItem value={'La Victoria'}>La Victoria</MenuItem>
            <MenuItem value={'Lima'}>Lima</MenuItem>
            <MenuItem value={'Lince'}>Lince</MenuItem>
            <MenuItem value={'Los Olivos'}>Los Olivos</MenuItem>
            <MenuItem value={'Lurigancho'}>Lurigancho</MenuItem>
            <MenuItem value={'Lurín'}>Lurín</MenuItem>
            <MenuItem value={'Magdalena del Mar'}>Magdalena del Mar</MenuItem>
            <MenuItem value={'Miraflores'}>Miraflores</MenuItem>
            <MenuItem value={'Pachacámac'}>Pachacámac</MenuItem>
            <MenuItem value={'Pucusana'}>Pucusana</MenuItem>
            <MenuItem value={'Pueblo Libre'}>Pueblo Libre</MenuItem>
            <MenuItem value={'Puente Piedra'}>Puente Piedra</MenuItem>
            <MenuItem value={'Punta Hermosa'}>Punta Hermosa</MenuItem>
            <MenuItem value={'Punta Negra'}>Punta Negra</MenuItem>
            <MenuItem value={'Rímac'}>Rímac</MenuItem>
            <MenuItem value={'San Bartolo'}>San Bartolo</MenuItem>
            <MenuItem value={'San Borja'}>San Borja</MenuItem>
            <MenuItem value={'San Isidro'}>San Isidro</MenuItem>
            <MenuItem value={'San Juan de Lurigancho'}>
              San Juan de Lurigancho
            </MenuItem>
            <MenuItem value={'San Juan de Miraflores'}>
              San Juan de Miraflores
            </MenuItem>
            <MenuItem value={'San Luis'}>San Luis</MenuItem>
            <MenuItem value={'San Martín de Porres'}>
              San Martín de Porres
            </MenuItem>
            <MenuItem value={'San Miguel'}>San Miguel</MenuItem>
            <MenuItem value={'Santa Anita'}>Santa Anita</MenuItem>
            <MenuItem value={'Santa María del Mar'}>
              Santa María del Mar
            </MenuItem>
            <MenuItem value={'Santa Rosa'}>Santa Rosa</MenuItem>
            <MenuItem value={'Santiago de Surco'}>Santiago de Surco</MenuItem>
            <MenuItem value={'Surquillo'}>Surquillo</MenuItem>
            <MenuItem value={'Villa El Salvador'}>Villa El Salvador</MenuItem>
            <MenuItem value={'Villa María del Triunfo'}>
              Villa María del Triunfo
            </MenuItem>
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
          disabled={!areValuesDifferent(user, initialUser)}
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
