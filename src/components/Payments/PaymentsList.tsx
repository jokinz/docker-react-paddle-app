import { useState } from 'react'

import { Payment as PaymentType } from '../../types/payment'

import { Grid, List, styled } from '@mui/material'

import { updatePaymentById } from '../../api/payments/payment'
import PaymentItem from './PaymentItem'

type props = { payments: PaymentType[] }
const PaymentsList = ({ payments }: props) => {
  const [paymentsData, setPaymentsData] = useState(payments)
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }))
  const handlePaymentStatusUpdate = async (
    index: number,
    payment: PaymentType
  ) => {
    try {
      const response = await updatePaymentById(payment)
      if (response) {
        setPaymentsData((prev) => {
          const updatedPaymentsData = [...prev]
          updatedPaymentsData[index] = payment
          return updatedPaymentsData
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (paymentsData.length > 0) {
    return (
      <div>
        <h1>Lista de reservas</h1>
        <Grid item xs={12} md={6}>
          <Demo>
            <List dense={false}>
              {paymentsData.map((payment, index) => (
                <PaymentItem
                  key={index}
                  index={index}
                  payment={payment}
                  handlePaymentEnabledUpdate={handlePaymentStatusUpdate}
                />
              ))}
            </List>
          </Demo>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      <h1>Lista de reservas</h1>
      Ningna reserva para mostrar
    </div>
  )
}

export default PaymentsList
