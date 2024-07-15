import {
  ListItem,
  ListItemText
} from '@mui/material'

import { NavLink } from 'react-router-dom'
import { Payment as PaymentType } from '../../types/payment'

type props = {
  index: number
  payment: PaymentType
}
const PaymentItem = ({ payment }: props) => {
  return (
    <ListItem
    >
      <NavLink to={`/payments/${payment.id}`}>
        <ListItemText
          primary={`id: ${payment.id}`}
          secondary={`idReserve: ${payment.idReserve} transactionCode: ${payment.transactionCode}`}
        />
      </NavLink>
    </ListItem>
  )
}

export default PaymentItem
