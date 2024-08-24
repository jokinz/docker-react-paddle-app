import { useContext, useEffect, useRef, useState } from 'react'

import { Item, ItemCategory, UpdateItem } from '../../types/item'

import { updateItemById } from '../../api/items/item'

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { areValuesDifferent, getDifferences } from '../../utils'

import { EmployeeContext } from '../../contexts/EmployeeContext'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'
import { getAllItemCategories } from '../../api/items/itemCategory'

type props = {
  item: Item
  updateItem: (updatedItem: Item) => void
}

const ItemDetails = ({ item, updateItem }: props) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const initialItem = useRef(item)
  const [itemCategories, setItemCategories] = useState<ItemCategory[]>([])
  const [newThumbnail, setNewThumbnail] = useState<string | null>(null)

  const imgSrc = item.thumbnail ? (newThumbnail ? newThumbnail : item.thumbnail) : ''

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const handleUpdateButtonClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const isItemValid = (): boolean => {
    if (item.name === '' || item.description === '' || item.price === 0) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    const getItemCategories = async () => {
      if (token) {
        try {
          const response = await getAllItemCategories(token)
          if (response) {
            setItemCategories(response)
          }
        } catch (error) {
          enqueueSnackbar(`Error cargando las categorías`, { variant: 'error' })
        }
      }
    }
    getItemCategories()
  }, [])

  const handleConfirmationClick = async () => {
    const oldItem: UpdateItem = {
      itemCategoryId: initialItem.current.itemCategory.id,
      name: initialItem.current.name,
      description: initialItem.current.description,
      price: initialItem.current.price,
      enabled: initialItem.current.enabled,
    }
    const newItem: UpdateItem = {
      itemCategoryId: item.itemCategory.id,
      name: item.name,
      description: item.description,
      price: item.price,
      enabled: item.enabled,
    }
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        if (newThumbnail) {
          const result = await updateItemById(
            item.id,
            { ...getDifferences(oldItem, newItem), thumbnail: newThumbnail },
            token
          )
          if (result) {
            enqueueSnackbar('Item actualizado', { variant: 'success' })
          }
        } else {
          const result = await updateItemById(
            item.id,
            getDifferences(oldItem, newItem),
            token
          )
          if (result) {
            enqueueSnackbar('Item actualizado', { variant: 'success' })
          }
        }
      }
    } catch (error) {
      enqueueSnackbar('Error actualizando', { variant: 'error' })
    } finally {
      setShowModal(false)
      setUpdateLoading(false)
    }
  }

  const handleEnabledClick = async () => {
    const updatedEnabled = !item.enabled
    const updatedItem = { ...item, enabled: updatedEnabled }
    updateItem(updatedItem)
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    updateItem({
      ...item,
      itemCategory: { ...item.itemCategory, id: parseInt(event.target.value) },
    })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewThumbnail(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setNewThumbnail(null)
    }
  }

  return (
    <DetailsWrapper>
      <Grid textAlign={'center'} item xs={12}>
        <h1>Actualizar item</h1>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={item.itemCategory.id.toString()}
            label="Categoría"
            onChange={handleCategoryChange}
          >
            {itemCategories.map((category, index) => (
              <MenuItem key={index} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="name"
          label="Nombre"
          variant="filled"
          value={item.name}
          onChange={(e) => updateItem({ ...item, name: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="description"
          label="Descripción"
          variant="filled"
          value={item.description}
          onChange={(e) => updateItem({ ...item, description: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="price"
          label="Precio"
          type="number"
          variant="filled"
          value={item.price}
          onChange={(e) => {
            if (e.target.value === '') {
              updateItem({ ...item, price: 0 })
            } else {
              updateItem({ ...item, price: parseInt(e.target.value) })
            }
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch
              aria-label="Activado"
              checked={item.enabled}
              onClick={handleEnabledClick}
            />
          }
          label="Activado"
          labelPlacement="start"
        />
      </Grid>
      <Grid item xs={12}>
        <img style={{ display: 'block', maxWidth: '100%' }} src={imgSrc} />
      </Grid>
      <Grid item xs={6}>
        <input
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={handleImageChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={
            (!areValuesDifferent(item, initialItem.current) ||
              !isItemValid()) &&
            newThumbnail === null
          }
          variant="contained"
          onClick={handleUpdateButtonClick}
        >
          Actualizar
        </Button>
      </Grid>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'¿Actualizar el estado del item?'}
        </DialogTitle>
        <DialogActions>
          <Button
            disabled={updateLoading}
            onClick={handleConfirmationClick}
            autoFocus
          >
            <LoadingWrapper loading={updateLoading}> </LoadingWrapper>
            Sí, actualizar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </DetailsWrapper>
  )
}

export default ItemDetails
