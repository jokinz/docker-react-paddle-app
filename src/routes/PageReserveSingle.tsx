import { useParams } from 'react-router-dom'

import Drawer from '../components/Drawer'
import ReserveDetails from '../components/Reserves/ReserveDetails'
import ForceLogin from '../components/ForceLogin'

const PageReserveSingle = () => {
  const params = useParams<{ reserveId: string }>()
  return (
    <ForceLogin>
      <Drawer>
        <ReserveDetails reserveId={params.reserveId as string} />
      </Drawer>
    </ForceLogin>
  )
}

export default PageReserveSingle
