import { Reservation as ReservationType } from '../../types/reservation'

import { Grid, List } from '@mui/material'

import ReservationItem from './ReservationItem'

type props = { reservations: ReservationType[] }
const ReservationsList = ({ reservations }: props) => {
  if (reservations.length > 0) {
    return (
      <div>
        <h1>Resultado</h1>
        <Grid item xs={12} md={6}>
          <List dense={false}>
            {reservations.map((reservation, index) => (
              <ReservationItem
                key={index}
                index={index}
                reservation={reservation}
              />
            ))}
          </List>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      <h1>Resultado</h1>
      Ninguna reserva para mostrar
    </div>
  )
}

export default ReservationsList
