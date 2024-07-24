import { useCallback, useEffect, useState } from 'react'

import _ from 'lodash'

import { Payment } from '../types/payment'

import { getAllPayments } from '../api/payments/payment'

import { Grid, TextField } from '@mui/material'

import Drawer from '../components/Drawer'
import ForceLogin from '../components/ForceLogin'
import PaymentsList from '../components/Payments/PaymentsList'
import LoadingWrapper from '../components/LoadingWrapper'
import SkeletonList from '../components/SkeletonList'

const PagePayments = () => {
  const [paymentList, setPaymentList] = useState<Payment[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useCallback(
    _.debounce(async (newValue: string) => {
      await handleSearchPayments(newValue)
    }, 1000),
    []
  )
  useEffect(() => {
    debouncedSearch(searchValue)
    return debouncedSearch.cancel
  }, [searchValue, debouncedSearch])

  const handleSearchPayments = async (newValue: string) => {
    try {
      // TODO: update what functions calls
      if (newValue !== '') {
        setLoading(true)
        const result = await getAllPayments()
        if (result) {
          setPaymentList(result)
        } else {
          setPaymentList([])
        }
      }
    } catch (error) {
      setPaymentList([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <ForceLogin>
      <Drawer>
        <h1>Página Pagos</h1>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="searchValue"
              label="Documento/Código de reserva"
              variant="filled"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
        </Grid>
        <LoadingWrapper loading={loading} skeleton={<SkeletonList/>}>
          <PaymentsList payments={paymentList} />
        </LoadingWrapper>
      </Drawer>
    </ForceLogin>
  )
}

export default PagePayments
