import { useState } from 'react'

import { useCookies } from 'react-cookie'

import { NewItem } from '../../types/item'

import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material'
import { createItemNoResponse } from '../../api/items/item'
import { BOHEMIA_PADEL_JWT } from '../../types/userCookie'

const starterNewItem: NewItem = {
  name: '',
  // enabled: true,
  description: '',
  price: 0,
  itemCategoryId: 1,
  thumbnail: null,
}

const ItemCreate = () => {
  const [cookies] = useCookies([BOHEMIA_PADEL_JWT])
  const token = cookies[BOHEMIA_PADEL_JWT].token

  const [item, setItem] = useState<NewItem>(starterNewItem)
  // const handleEnabledClick = async () => {
  //   setItemData((prev) => {
  //     const updatedEnabled = !prev.enabled
  //     return { ...prev, enabled: updatedEnabled }
  //   })
  // }
  const handleCreateItemClick = async () => {
    const response = await createItemNoResponse(item, token)
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
          value={item.name}
          onChange={(e) =>
            setItem((prev) => {
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
          value={item.description}
          onChange={(e) =>
            setItem((prev) => {
              return { ...prev, description: e.target.value }
            })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="price"
          label="Precio"
          type="number"
          variant="filled"
          value={item.price}
          onChange={(e) =>
            setItem((prev) => {
              return { ...prev, price: parseInt(e.target.value) }
            })
          }
        />
      </Grid>
      {/* <Grid item xs={6}>
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
      </Grid> */}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleCreateItemClick}>
          Crear item
        </Button>
      </Grid>
    </Grid>
  )
}

export default ItemCreate
