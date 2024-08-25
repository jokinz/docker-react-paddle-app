import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Reservation } from '../types/reservation'

import { getReservationById } from '../api/reservations'

import Drawer from '../components/Drawer'
import ReservationDetails from '../components/Reservations/ReservationDetails'
import LoadingWrapper from '../components/LoadingWrapper'
import { EmployeeContext } from '../contexts/EmployeeContext'

const PageReservationSingle = () => {
  const params = useParams<{ reservationId: string }>()

  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [loading, setLoading] = useState(true)
  const [reservation, setReservation] = useState<Reservation | null>(null)

  const updateReservation = (updatedReservation: Reservation) => {
    setReservation(updatedReservation)
  }

  useEffect(() => {
    const getReservationData = async () => {
      try {
        if (params.reservationId && token && token !== '') {
          const result = await getReservationById(
            parseInt(params.reservationId),
            token
          )
          if (result) {
            setReservation(result)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getReservationData()
  }, [])

  return (
    <Drawer>
      <LoadingWrapper loading={loading}>
        {reservation !== null ? (
          <ReservationDetails
            reservation={reservation}
            updateReservation={updateReservation}
          />
        ) : (
          <h1>Reserva no encontrada</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageReservationSingle
