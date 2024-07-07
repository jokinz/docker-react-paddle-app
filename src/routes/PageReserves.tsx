import { useEffect, useState } from 'react'

import { Reserve } from '../types/reserve'

import { getAllReserves } from '../api/reserves/reserve'
import { reserveExample } from '../api/dummy'

import ButtonLogout from '../components/ButtonLogout'
import ForceLogin from '../components/ForceLogin'
import LoadingWrapper from '../components/LoadingWrapper'
import UpdateReserve from '../components/Reserves/UpdateReserve'
import ReservesList from '../components/Reserves/ReservesList'

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
      <div>
        Página Reservas
        <UpdateReserve reserve={reserveExample} />
        <LoadingWrapper loading={loading}>
          <ReservesList reserves={reserveList} />
        </LoadingWrapper>
      </div>
      <ButtonLogout />
    </ForceLogin>
  )
}

export default PageReserves
