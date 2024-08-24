import { useContext, useEffect, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { createItemWithResponse } from '../../api/items/item'

import { ItemCategory, NewItem } from '../../types/item'

import { EmployeeContext } from '../../contexts/EmployeeContext'

import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'
import { getAllItemCategories } from '../../api/items/itemCategory'

const starterNewItem: NewItem = {
  name: '',
  description: '',
  price: 0,
  itemCategoryId: 0,
  thumbnail: null,
}

const ItemCreate = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [item, setItem] = useState<NewItem>(starterNewItem)
  const [itemCategories, setItemCategories] = useState<ItemCategory[]>([])

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

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

  const resetItem = () => {
    setItem(starterNewItem)
  }

  const handleCreateClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const isItemValid = (): boolean => {
    if (
      item.name === '' ||
      item.description === '' ||
      item.price === 0 ||
      item.itemCategoryId === 0
    ) {
      return false
    } else {
      return true
    }
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setItem({ ...item, itemCategoryId: parseInt(event.target.value) })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setItem((prev) => {
          return { ...prev, thumbnail: reader.result as string }
        })
      }
      reader.readAsDataURL(file)
    } else {
      setItem((prev) => {
        return { ...prev, thumbnail: null }
      })
    }
  }

  const handleConfirmationClick = async () => {
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        const response = await createItemWithResponse(item, token)
        if (response) {
          setShowModal(false)
          enqueueSnackbar('Item creado', { variant: 'success' })
          resetItem()
        }
      }
    } catch (error: any) {
      if (error.response.data.message) {
        enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
      } else {
        enqueueSnackbar('Error creando item', { variant: 'error' })
      }
    } finally {
      setShowModal(false)
      setUpdateLoading(false)
    }
  }
  return (
    <DetailsWrapper>
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
              if (e.target.value === '') {
                return { ...prev, price: 0 }
              } else {
                return { ...prev, price: parseInt(e.target.value) }
              }
            })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <input
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={handleImageChange}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={item.itemCategoryId.toString()}
            label="Tipo"
            onChange={handleCategoryChange}
          >
            <MenuItem disabled value={0}>
              ---
            </MenuItem>
            {itemCategories.map((category, index) => (
              <MenuItem key={index} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!isItemValid()}
          variant="contained"
          onClick={handleCreateClick}
        >
          Crear
        </Button>
      </Grid>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'¿Crear ítem?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nombre: {item.name}
            <br />
            Descripción: {item.description}
            <br />
            Precio: S/.{item.price}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={updateLoading}
            onClick={handleConfirmationClick}
            autoFocus
          >
            <LoadingWrapper loading={updateLoading}> </LoadingWrapper>
            Sí, crear
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </DetailsWrapper>
  )
}

export default ItemCreate
