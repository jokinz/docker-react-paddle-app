import { useNavigate } from 'react-router-dom'

import { Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'

import { Payment as PaymentType } from '../../types/payment'

type props = {
  index: number
  payment: PaymentType
}
const PaymentItem = ({ payment }: props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/payments/${payment.id}`)
  }
  return (
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <Grid container display={'flex'} alignItems={'center'}>
          <ListItemText primary={`Número de pago: ${payment.id}`} />
          <Grid item xs={3}>
            Código de transacción: {payment.transactionCode}
          </Grid>
          <Grid item xs={3}>
            Número de reserva: <b>{payment.idReserve}</b>
          </Grid>
          <Grid item xs={3}>
            Estado del pago: <b>{`${payment.status}`}</b>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

export default PaymentItem
