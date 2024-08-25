import { useNavigate } from 'react-router-dom'

import { Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'

import { Reservation as ReservationType } from '../../types/reservation'

type props = {
  index: number
  reservation: ReservationType
}
const ReservationItem = ({ reservation }: props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/reservations/${reservation.id}`)
  }
  return (
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <Grid container display={'flex'} alignItems={'center'}>
          <ListItemText primary={`Reserva N° ${reservation.id}`} />
          <Grid item xs={3}>
            Número de pago: <b>no hay</b>
          </Grid>
          <Grid item xs={3}>
            Items entregados:{' '}
            <b>{`${reservation.itemsHanded ? 'SÍ' : 'NO'}`}</b>
          </Grid>
          <Grid item xs={3}>
            Horario: {reservation.schedule.startTime}{' '}
            {reservation.schedule.endTime}
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

export default ReservationItem
