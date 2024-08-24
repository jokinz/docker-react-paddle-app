import { useContext, useState } from 'react'

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

import { NewItem } from '../../types/item'

import { EmployeeContext } from '../../contexts/EmployeeContext'

import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'

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

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const resetItem = () => {
    setItem(starterNewItem)
  }

  const handleCreateClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setItem({ ...item, itemCategoryId: parseInt(event.target.value) })
  }

  // TODO: update function
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
              return { ...prev, price: parseInt(e.target.value) }
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
            {/* TODO: update categories source */}
            <MenuItem disabled value={0}>
              ---
            </MenuItem>
            <MenuItem value={1}>Cat 1</MenuItem>
            <MenuItem value={2}>Cat 2</MenuItem>
            <MenuItem value={3}>Cat 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleCreateClick}>
          Crear item
        </Button>
      </Grid>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'¿Crear trabajador?'}
        </DialogTitle>
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
