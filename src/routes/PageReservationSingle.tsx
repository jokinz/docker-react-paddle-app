import { useParams } from 'react-router-dom'

import Drawer from '../components/Drawer'
import ReserveDetails from '../components/Reserves/ReserveDetails'

const PageReservationSingle = () => {
  const params = useParams<{ reserveId: string }>()
  return (
    <Drawer>
      <ReserveDetails reserveId={params.reserveId as string} />
    </Drawer>
  )
}

export default PageReservationSingle
