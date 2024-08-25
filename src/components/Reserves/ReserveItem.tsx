import { useNavigate } from 'react-router-dom'

import { Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'

import { Reservation as ReserveType } from '../../types/reservation'

type props = {
  index: number
  reserve: ReserveType
}
const ReserveItem = ({ reserve }: props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/reserves/${reserve.id}`)
  }
  return (
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <Grid container display={'flex'} alignItems={'center'}>
          <ListItemText primary={`Número de reserva: ${reserve.id}`} />
          <Grid item xs={3}>
            Número de pago: <b>no hay</b>
          </Grid>
          <Grid item xs={3}>
            Items entregados: <b>{`${reserve.itemsHanded ? 'SÍ' : 'NO'}`}</b>
          </Grid>
          <Grid item xs={3}>
            Horario: {reserve.idSchedule} {reserve.endtime.toDateString()}
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

export default ReserveItem
