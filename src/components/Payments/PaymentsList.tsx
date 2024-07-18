
import { Payment as PaymentType } from '../../types/payment'

import { Grid, List } from '@mui/material'

import PaymentItem from './PaymentItem'

type props = { payments: PaymentType[] }
const PaymentsList = ({ payments }: props) => {

  if (payments.length > 0) {
    return (
      <div>
        <h1>Resultado</h1>
        <Grid item xs={12} md={6}>
          <List dense={false}>
            {payments.map((payment, index) => (
              <PaymentItem key={index} index={index} payment={payment} />
            ))}
          </List>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      <h1>Lista de pagos</h1>
      Ninguna pago para mostrar
    </div>
  )
}

export default PaymentsList
