import { useEffect, useState } from 'react'

import { Payment } from '../types/payment'

import { getAllPayments } from '../api/payments/payment'

import ButtonLogout from '../components/ButtonLogout'
import ForceLogin from '../components/ForceLogin'
import LoadingWrapper from '../components/LoadingWrapper'
import PaymentsList from '../components/Payments/PaymentsList'

const PagePayments = () => {
  const [paymentList, setPaymentList] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      const result = await getAllPayments()
      if (result) {
        setPaymentList(result)
        setLoading(false)
      } else {
        setPaymentList([])
        setLoading(false)
      }
    }
    getData()
  }, [])
  return (
    <ForceLogin>
      <div>
        Página Payments
        <LoadingWrapper loading={loading}>
          <PaymentsList payments={paymentList} />
        </LoadingWrapper>
      </div>
      <ButtonLogout />
    </ForceLogin>
  )
}

export default PagePayments
