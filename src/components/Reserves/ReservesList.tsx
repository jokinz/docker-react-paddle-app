
import { Reservation as ReserveType } from '../../types/reservation'

import { Grid, List } from '@mui/material'

import ReserveItem from './ReserveItem'

type props = { reserves: ReserveType[] }
const ReservesList = ({ reserves }: props) => {
  if (reserves.length > 0) {
    return (
      <div>
        <h1>Resultado</h1>
        <Grid item xs={12} md={6}>
          <List dense={false}>
            {reserves.map((reserve, index) => (
              <ReserveItem key={index} index={index} reserve={reserve} />
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

export default ReservesList
