import { useState } from 'react'
import { Item as ItemType } from '../../types/item'

import {
  Avatar,
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
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
        <IconButton edge="end" aria-label="delete">
          <Icon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <Icon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${item.name}`} secondary={item.price} />
      <Switch
        disabled={disabled}
        checked={item.enabled}
        onClick={(e) => handleSwitchClick(e)}
      />
    </ListItem>
  )
}

export default Item
