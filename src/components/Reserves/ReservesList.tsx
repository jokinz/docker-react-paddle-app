import { useState } from 'react'

import { Reserve as ReserveType } from '../../types/reserve'

import { Grid, List, styled } from '@mui/material'

import { updateReserveById } from '../../api/reserves/reserve'
import ReserveItem from './ReserveItem'

type props = { reserves: ReserveType[] }
const ReservesList = ({ reserves }: props) => {
  const [reservesData, setReservesData] = useState(reserves)
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }))
  const handleReserveItemsHandedUpdate = async (
    index: number,
    reserve: ReserveType
  ) => {
    try {
      const response = await updateReserveById(reserve)
      if (response) {
        setReservesData((prev) => {
          const updatedReservesData = [...prev]
          const itemsHanded = updatedReservesData[index].itemsHanded
          updatedReservesData[index].itemsHanded = !itemsHanded
          return updatedReservesData
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (reservesData.length > 0) {
    return (
      <div>
        <h1>Lista de reservas</h1>
        <Grid item xs={12} md={6}>
          <Demo>
            <List dense={false}>
              {reserves.map((reserve, index) => (
                <ReserveItem
                  key={index}
                  index={index}
                  reserve={reserve}
                  handleReserveEnabledUpdate={handleReserveItemsHandedUpdate}
                />
              ))}
            </List>
          </Demo>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      <h1>Lista de reservas</h1>
      Ningna reserva para mostrar
    </div>
  )
}

export default ReservesList
