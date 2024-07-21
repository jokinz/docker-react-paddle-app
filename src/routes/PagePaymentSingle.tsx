import { useParams } from 'react-router-dom'

import Drawer from '../components/Drawer'
import PaymentDetails from '../components/Payments/PaymentDetails'
import ForceLogin from '../components/ForceLogin'

const PagePaymentSingle = () => {
  const params = useParams<{ paymentId: string }>()
  return (
    <ForceLogin>
      <Drawer>
        <PaymentDetails paymentId={params.paymentId as string} />
      </Drawer>
    </ForceLogin>
  )
}

export default PagePaymentSingle
