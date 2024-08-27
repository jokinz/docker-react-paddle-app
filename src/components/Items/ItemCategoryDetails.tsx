import { useContext, useRef, useState } from 'react'

import { ItemCategory, UpdateItem } from '../../types/item'

import { updateItemById } from '../../api/items/item'

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { areValuesDifferent, getDifferences } from '../../utils'

import { updateItemCategoryById } from '../../api/items/itemCategory'
import { EmployeeContext } from '../../contexts/EmployeeContext'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'

type props = {
  itemCategory: ItemCategory
  updateItemCategory: (updatedItemCategory: ItemCategory) => void
}

const ItemDetails = ({ itemCategory, updateItemCategory }: props) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const initialItemCategory = useRef(itemCategory)
  const [newIcon, setNewIcon] = useState<string | null>(null)

  const imgSrc = itemCategory.icon
    ? newIcon
      ? newIcon
      : itemCategory.icon
    : ''

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const handleUpdateButtonClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const isItemCategoryValid = (): boolean => {
    if (itemCategory.name === '') {
      return false
    } else {
      return true
    }
  }

  const handleConfirmationClick = async () => {
    const oldItem: UpdateItem = {
      name: initialItemCategory.current.name,
    }
    const newItem: UpdateItem = {
      name: itemCategory.name,
    }
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        if (newIcon) {
          const result = await updateItemCategoryById(
            itemCategory.id,
            { ...getDifferences(oldItem, newItem), icon: newIcon },
            token
          )
          if (result) {
            enqueueSnackbar('Categoría actualizada', { variant: 'success' })
          }
        } else {
          const result = await updateItemById(
            itemCategory.id,
            getDifferences(oldItem, newItem),
            token
          )
          if (result) {
            enqueueSnackbar('Categoría actualizada', { variant: 'success' })
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewIcon(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setNewIcon(null)
    }
  }

  return (
    <DetailsWrapper>
      <Grid textAlign={'center'} item xs={12}>
        <h1>Actualizar categoría</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="name"
          label="Nombre"
          variant="filled"
          value={itemCategory.name}
          onChange={(e) =>
            updateItemCategory({ ...itemCategory, name: e.target.value })
          }
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
            (!areValuesDifferent(itemCategory, initialItemCategory.current) ||
              !isItemCategoryValid()) &&
            newIcon === null
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
