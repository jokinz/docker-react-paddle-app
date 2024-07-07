import { useState } from 'react'

import { NewItem } from '../../types/item'

import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material'
import { createItem } from '../../api/items/item'

const starterNewItem: NewItem = {
  name: '',
  enabled: true,
  description: '',
  price: 0,
}

const NewItemForm = () => {
  const [itemData, setItemData] = useState<NewItem>(starterNewItem)
  const handleEnabledClick = async () => {
    setItemData((prev) => {
      const updatedEnabled = !prev.enabled
      return { ...prev, enabled: updatedEnabled }
    })
  }
  const handleCreateItemClick = async () => {
    const response = await createItem(itemData)
    console.log(response)
  }
  return (
    <Grid container columns={12}>
      <Grid item xs={12}>
        <h1>Crear item</h1>
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
          type='number'
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
          labelPlacement='start'
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleCreateItemClick}>
          Crear item
        </Button>
      </Grid>
    </Grid>
  )
}

export default NewItemForm
