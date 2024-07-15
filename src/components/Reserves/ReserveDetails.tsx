import { useState } from 'react'

import { Reserve } from '../../types/reserve'

import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material'
import { updateReserveById } from '../../api/reserves/reserve'
type props = {
  reserve: Reserve
}

const ReserveDetails = ({ reserve }: props) => {
  const [reserveData, setReserveData] = useState<Reserve>(reserve)
  const handleEnabledClick = async () => {
    setReserveData((prev) => {
      const updatedEnabled = !prev.itemsHanded
      return { ...prev, enabled: updatedEnabled }
    })
  }
  const handleUpdateReserveClick = async () => {
    const response = await updateReserveById(reserveData)
    console.log(response)
  }
  return (
    <Grid container width={'50%'} rowSpacing={3} gridColumn={2}>
      <Grid item xs={12}>
        <h1>Actualizar reserva</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="id"
          label="ID"
          variant="filled"
          value={reserveData.id}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="endTime"
          label="endTime"
          variant="filled"
          value={reserveData.endtime}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          id="totalPrice"
          label="Precio"
          variant="filled"
          disabled
          value={reserveData.totalPrice}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch
              aria-label="Items entregados"
              checked={reserveData.itemsHanded}
              onClick={handleEnabledClick}
            />
          }
          label="Items entregados"
          labelPlacement="start"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleUpdateReserveClick}>
          Actualizar reserva
        </Button>
      </Grid>
    </Grid>
  )
}

export default ReserveDetails
