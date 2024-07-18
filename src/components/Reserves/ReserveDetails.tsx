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
        <Grid container width={'50%'} rowSpacing={3} gridColumn={2}>
          <Grid item xs={12}>
            <h1>Actualizar reserva</h1>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="id"
              label="ID"
              variant="filled"
              value={reserve.id}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="endTime"
              label="endTime"
              variant="filled"
              value={reserve.endtime}
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
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  aria-label="Items entregados"
                  checked={reserve.itemsHanded}
                  onChange={handleItemsHandedChange}
                />
              }
              label="Items entregados"
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleUpdateButtonClick}>
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
              {'¿Actualizar el estado de losítems entregados?'}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                disabled={updateLoading}
                onClick={handleConfirmationClick}
                autoFocus
              >
                <LoadingWrapper loading={updateLoading}>
                  Sí, actualizar
                </LoadingWrapper>
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      ) : (
        <h1>Reserva no encontrada</h1>
      )}
    </LoadingWrapper>
  )
}

export default ReserveDetails
