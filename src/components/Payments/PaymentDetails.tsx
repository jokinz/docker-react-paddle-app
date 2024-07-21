import { useEffect, useState } from 'react'

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
  TextField
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { Payment, paymentStatus } from '../../types/payment'

import { getPaymentById, updatePaymentById } from '../../api/payments/payment'

import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'

type props = { paymentId: string }

const PaymentDetails = ({ paymentId }: props) => {
  const [loading, setLoading] = useState(true)
  const [payment, setPayment] = useState<Payment | null>(null)
  const [newStatus, setNewStatus] = useState<paymentStatus>(
    payment?.status as paymentStatus
  )
  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const handlePaymentStatusChange = (event: SelectChangeEvent) => {
    setNewStatus(event.target.value as paymentStatus)
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
      const result = await updatePaymentById({
        ...payment,
        status: newStatus,
      } as Payment)
      if (result) {
        setShowModal(false)
        setPayment(result)
        enqueueSnackbar('Pago actualizado', { variant: 'success' })
      }
    } catch (error) {
      enqueueSnackbar('Error actualizando', { variant: 'error' })
    } finally {
      setUpdateLoading(false)
    }
  }

  useEffect(() => {
    const getPaymentData = async () => {
      try {
        if (paymentId) {
          const result = await getPaymentById(parseInt(paymentId))
          if (result) {
            setPayment(result)
            setNewStatus(result.status)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getPaymentData()
  }, [])

  return (
    <LoadingWrapper loading={loading}>
      {payment ? (
        <DetailsWrapper>
          <Grid textAlign={'center'} item xs={12}>
            <h1>Detalles de pago N° {payment.id}</h1>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="transactionCode"
              label="transactionCode"
              variant="filled"
              value={payment.transactionCode}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="idReserve"
              label="idReserve"
              variant="filled"
              value={payment.idReserve}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="new-status-label">Estado de pago</InputLabel>
              <Select
                disabled={
                  payment.status === 'paid' || payment.status === 'failed'
                }
                labelId="new-status-label"
                id="newStatus"
                value={newStatus}
                label="Estado de pago"
                onChange={handlePaymentStatusChange}
              >
                {/* TODO: consultar lógica para disabled */}
                <MenuItem disabled value={'pending'}>
                  Pendiente
                </MenuItem>
                <MenuItem value={'paid'}>Pagado</MenuItem>
                <MenuItem value={'failed'}>Fallido</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} textAlign={'center'}>
            <Button
              variant="contained"
              disabled={payment.status === newStatus}
              onClick={handleUpdateButtonClick}
            >
              Actualizar pago
            </Button>
          </Grid>
          <Dialog
            open={showModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'¿Actualizar el estado del pago?'}
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
        <h1>Pago no encontrado</h1>
      )}
    </LoadingWrapper>
  )
}

export default PaymentDetails
