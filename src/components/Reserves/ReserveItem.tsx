import { useState } from 'react'

import { FormControlLabel, ListItem, ListItemText, Switch } from '@mui/material'

import { Reserve as ReserveType } from '../../types/reserve'

type props = {
  index: number
  reserve: ReserveType
  handleReserveEnabledUpdate(index: number, reserve: ReserveType): Promise<void>
}
const ReserveItem = ({ index, reserve, handleReserveEnabledUpdate }: props) => {
  const [disabled, setDisabled] = useState(false)
  const handleSwitchClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setDisabled(true)
    await handleReserveEnabledUpdate(index, reserve)
    setDisabled(false)
  }
  return (
    <ListItem
      secondaryAction={
        <FormControlLabel
          control={
            <Switch
              disabled={disabled}
              checked={reserve.itemsHanded}
              onClick={(e) => handleSwitchClick(e)}
            />
          }
          label="Items entregados:"
          labelPlacement="start"
        />
      }
    >
      <ListItemText
        primary={`id: ${reserve.id} idPlayingField: ${reserve.idPlayingField} idPlayingField: ${reserve.idStablishment} `}
        secondary={`itemsHanded: ${reserve.itemsHanded}`}
      />
    </ListItem>
  )
}

export default ReserveItem
