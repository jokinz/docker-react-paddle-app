import { useContext, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { Reservation } from '../../types/reservation'

import { updateReservationHandItemsById } from '../../api/reservations'
import { EmployeeContext } from '../../contexts/EmployeeContext'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'
import ReservationItemsAccordion from './ReservationItemsAccordion'
import { useNavigate } from 'react-router-dom'

type props = {
  reservation: Reservation
}

const ReservationDetails = ({ reservation }: props) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [handItems, setHandItems] = useState<boolean>(reservation.itemsHanded)

  const handleUpdateButtonClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleItemsHandedChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHandItems(event.target.checked)
  }

  const handleConfirmationClick = async () => {
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        const result = await updateReservationHandItemsById(
          reservation.id,
          token
        )
        if (result) {
          enqueueSnackbar('Reserva actualizada', { variant: 'success' })
          navigate(`/reservations`)
        }
      }
    } catch (error) {
      enqueueSnackbar('Error actualizando reserva', { variant: 'error' })
    } finally {
      setUpdateLoading(false)
      setShowModal(false)
    }
  }

  return (
    <DetailsWrapper>
      <Grid textAlign={'center'} item xs={12}>
        <h1>Detalles de reserva N° {reservation.id}</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="code"
          label="Código de reserva"
          variant="filled"
          value={reservation.code}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="idUser"
          label="ID usuario"
          variant="filled"
          value={reservation.userId}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="idEstablishment"
          label="ID Establecimiento"
          variant="filled"
          value={reservation.establishmentId}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="idPlayingField"
          label="Campo de juego"
          variant="filled"
          value={reservation.playingField.name}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="payed"
          label="Estado de pago"
          variant="filled"
          value={reservation.payed ? 'Pagado' : 'Pendiente'}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="date"
          label="Fecha"
          variant="filled"
          value={reservation.schedule.date}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="startTime"
          label="Hora Inicio"
          variant="filled"
          value={reservation.schedule.startTime}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="endTime"
          label="Hora final"
          variant="filled"
          value={reservation.schedule.endTime}
          fullWidth
          disabled
        />
      </Grid>
      <Grid
        item
        xs={6}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <FormControlLabel
          control={
            <Switch
              aria-label="Items entregados"
              disabled={reservation.itemsHanded}
              checked={handItems}
              onChange={handleItemsHandedChange}
            />
          }
          label="Items entregados"
          labelPlacement="start"
        />
      </Grid>
      <Grid
        item
        xs={12}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <ReservationItemsAccordion items={reservation.reservationItems} />
      </Grid>
      {!reservation.itemsHanded && (
        <Grid item xs={12} textAlign={'center'}>
          <Button
            variant="contained"
            onClick={handleUpdateButtonClick}
            disabled={!handItems}
          >
            Actualizar reserva
          </Button>
        </Grid>
      )}
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'¿Actualizar el estado de los ítems entregados?'}
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

export default ReservationDetails
