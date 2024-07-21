import { useEffect, useState } from 'react'

import { Reserve } from '../../types/reserve'

import { getReserveById, updateReserveById } from '../../api/reserves/reserve'

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

import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'

type props = { reserveId: string }

const ReserveDetails = ({ reserveId }: props) => {
  const [loading, setLoading] = useState(true)
  const [reserve, setReserve] = useState<Reserve | null>(null)
  const [itemsHanded, setItemsHanded] = useState<boolean>(
    reserve?.itemsHanded as boolean
  )
  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const handleItemsHandedChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemsHanded(event.target.checked)
  }

  const handleUpdateButtonClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleConfirmationClick = async () => {
    try {
      setUpdateLoading(true)
      const result = await updateReserveById({
        ...reserve,
        status: itemsHanded,
      } as Reserve)
      if (result) {
        setShowModal(false)
        setReserve(result)
        enqueueSnackbar('Reserva actualizada', { variant: 'success' })
      }
    } catch (error) {
      enqueueSnackbar('Error actualizando', { variant: 'error' })
    } finally {
      setUpdateLoading(false)
    }
  }

  useEffect(() => {
    const getReserveData = async () => {
      try {
        if (reserveId) {
          const result = await getReserveById(parseInt(reserveId))
          if (result) {
            setReserve(result)
            setItemsHanded(result.itemsHanded)
          } else {
            setReserve(null)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getReserveData()
  }, [])

  return (
    <LoadingWrapper loading={loading}>
      {reserve ? (
        <DetailsWrapper>
          <Grid textAlign={'center'} item xs={12}>
            <h1>Detalles de reserva N° {reserve.id}</h1>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="idUser"
              label="idUser"
              variant="filled"
              value={reserve.idUser}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="idEstablishment"
              label="idEstablishment"
              variant="filled"
              value={reserve.idEstablishment}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="idPlayingField"
              label="idPlayingField"
              variant="filled"
              value={reserve.idPlayingField}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="idPriceBracket"
              label="idPriceBracket"
              variant="filled"
              value={reserve.idPriceBracket}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="idSchedule"
              label="idSchedule"
              variant="filled"
              value={reserve.idSchedule}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="endTime"
              label="endTime"
              variant="filled"
              value={reserve.endtime}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              id="totalPrice"
              label="Precio"
              variant="filled"
              disabled
              value={reserve.totalPrice}
              fullWidth
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
                  disabled={reserve.itemsHanded}
                  checked={itemsHanded}
                  onChange={handleItemsHandedChange}
                />
              }
              label="Items entregados"
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={12} textAlign={'center'}>
            <Button
              variant="contained"
              onClick={handleUpdateButtonClick}
              disabled={!itemsHanded && itemsHanded === reserve.itemsHanded}
            >
              Actualizar reserva
            </Button>
          </Grid>
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
      ) : (
        <h1>Reserva no encontrada</h1>
      )}
    </LoadingWrapper>
  )
}

export default ReserveDetails
