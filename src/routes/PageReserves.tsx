import { useEffect, useState } from 'react'

import { Reserve } from '../types/reserve'

import { reserveExample } from '../api/dummy'
import { getAllReserves } from '../api/reserves/reserve'

import Drawer from '../components/Drawer'
import ForceLogin from '../components/ForceLogin'
import LoadingWrapper from '../components/LoadingWrapper'
import ReservesList from '../components/Reserves/ReservesList'
import UpdateReserve from '../components/Reserves/UpdateReserve'

const PageReserves = () => {
  const [reserveList, setReserveList] = useState<Reserve[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      const result = await getAllReserves()
      if (result) {
        setReserveList(result)
        setLoading(false)
      } else {
        setReserveList([])
        setLoading(false)
      }
    }
    getData()
  }, [])
  return (
    <ForceLogin>
      <Drawer>
        Página Reservas
        <UpdateReserve reserve={reserveExample} />
        <LoadingWrapper loading={loading}>
          <ReservesList reserves={reserveList} />
        </LoadingWrapper>
      </Drawer>
    </ForceLogin>
  )
}

export default PageReserves
