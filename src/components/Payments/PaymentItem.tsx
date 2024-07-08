import {
  FormControl,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import { Payment as PaymentType, paymentStatus } from '../../types/payment'

type props = {
  index: number
  payment: PaymentType
  handlePaymentEnabledUpdate(index: number, payment: PaymentType): Promise<void>
}
const PaymentItem = ({ index, payment, handlePaymentEnabledUpdate }: props) => {
  const handlePaymentStatusChange = (event: SelectChangeEvent) => {
    const newPayment: PaymentType = {
      ...payment,
      status: event.target.value as paymentStatus,
    }
    handlePaymentEnabledUpdate(index, newPayment)
  }
  return (
    <ListItem
      secondaryAction={
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-label">Estado de pago</InputLabel>
          <Select
            disabled={payment.status === 'paid' || payment.status === 'failed'}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={payment.status}
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
      }
    >
      <ListItemText
        primary={`id: ${payment.id}`}
        secondary={`idReserve: ${payment.idReserve} transactionCode: ${payment.transactionCode}`}
      />
    </ListItem>
  )
}

export default PaymentItem
