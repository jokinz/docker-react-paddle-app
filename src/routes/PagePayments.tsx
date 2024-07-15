import { useState } from 'react'

import { Payment } from '../types/payment'

import { getAllPayments } from '../api/payments/payment'

import { Button, Grid, TextField } from '@mui/material'

import Drawer from '../components/Drawer'
import ForceLogin from '../components/ForceLogin'
import PaymentsList from '../components/Payments/PaymentsList'

const PagePayments = () => {
  const [paymentList, setPaymentList] = useState<Payment[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearchPaymentsClick = async () => {
    try {
      // TODO: update what functions calls
      const result = await getAllPayments()
      if (result) {
        setPaymentList(result)
      } else {
        setPaymentList([])
      }
    } catch (error) {
    } finally {
      setSearched(true)
    }
  }
  return (
    <ForceLogin>
      <Drawer>
        <h1>Página Payments</h1>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              id="searchValue"
              label="Documento/Código de reserva"
              variant="filled"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleSearchPaymentsClick}>
                Actualizar usuario
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {searched && <PaymentsList payments={paymentList} />}
      </Drawer>
    </ForceLogin>
  )
}

export default PagePayments
