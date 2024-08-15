import { useParams } from 'react-router-dom'

import Drawer from '../components/Drawer'
import PaymentDetails from '../components/Payments/PaymentDetails'

const PagePaymentSingle = () => {
  const params = useParams<{ paymentId: string }>()
  return (
    <Drawer>
      <PaymentDetails paymentId={params.paymentId as string} />
    </Drawer>
  )
}

export default PagePaymentSingle
