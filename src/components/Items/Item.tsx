import { useState } from 'react'
import { Item as ItemType } from '../../types/item'

import {
  Avatar,
  Icon,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch
} from '@mui/material'

type props = {
  index: number
  item: ItemType
  handleItemEnabledUpdate(index: number, item: ItemType): Promise<void>
}
const Item = ({ index, item, handleItemEnabledUpdate }: props) => {
  const [disabled, setDisabled] = useState(false)
  const handleSwitchClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setDisabled(true)
    await handleItemEnabledUpdate(index, item)
    setDisabled(false)
  }
  return (
    <ListItem
      secondaryAction={
        <Switch
          disabled={disabled}
          checked={item.enabled}
          onClick={(e) => handleSwitchClick(e)}
        />
      }
    >
      <ListItemAvatar>
        <Avatar>
          <Icon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${item.name}`} secondary={item.price} />
    </ListItem>
  )
}

export default Item
