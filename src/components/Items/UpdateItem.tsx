import { useState } from 'react'

import { Item } from '../../types/item'

import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material'
import { updateItemById } from '../../api/items/item'
type props = {
  item: Item
}
const UpdateItem = ({ item }: props) => {
  const [itemData, setItemData] = useState<Item>(item)
  const handleUpdateItemClick = async () => {
    const response = await updateItemById(itemData)
    console.log(response)
  }
  const handleEnabledClick = async () => {
    setItemData((prev) => {
      const updatedEnabled = !prev.enabled
      return { ...prev, enabled: updatedEnabled }
    })
  }
  return (
    <Grid container columns={12}>
      <Grid item xs={12}>
        <h1>Actualizar item</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="name"
          label="Nombre"
          variant="filled"
          value={itemData.name}
          onChange={(e) =>
            setItemData((prev) => {
              return { ...prev, name: e.target.value }
            })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="description"
          label="Descripción"
          variant="filled"
          value={itemData.description}
          onChange={(e) =>
            setItemData((prev) => {
              return { ...prev, description: e.target.value }
            })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="price"
          label="Precio"
          variant="filled"
          value={itemData.price}
          onChange={(e) =>
            setItemData((prev) => {
              return { ...prev, price: parseInt(e.target.value) }
            })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch
              aria-label="Activado"
              checked={itemData.enabled}
              onClick={handleEnabledClick}
            />
          }
          label="Activado"
          labelPlacement="start"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleUpdateItemClick}>
          Actualizar item
        </Button>
      </Grid>
    </Grid>
  )
}

export default UpdateItem
