import { useContext, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { NewItemCategory } from '../../types/item'

import { EmployeeContext } from '../../contexts/EmployeeContext'

import { createItemCategoryWithResponse } from '../../api/items/itemCategory'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'

const starterNewItemCategory: NewItemCategory = { name: '', icon: null }

const ItemCategoryCreate = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [itemCategory, setItemCategory] = useState<NewItemCategory>(
    starterNewItemCategory
  )

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const resetItemCategory = () => {
    setItemCategory(starterNewItemCategory)
  }

  const handleCreateClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const isCategoryValid = (): boolean => {
    if (itemCategory.name === '') {
      return false
    } else {
      return true
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setItemCategory((prev) => {
          return { ...prev, icon: reader.result as string }
        })
      }
      reader.readAsDataURL(file)
    } else {
      setItemCategory((prev) => {
        return { ...prev, icon: null }
      })
    }
  }

  const handleConfirmationClick = async () => {
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        const response = await createItemCategoryWithResponse(
          itemCategory,
          token
        )
        if (response) {
          setShowModal(false)
          enqueueSnackbar('Categoría creada', { variant: 'success' })
          resetItemCategory()
        }
      }
    } catch (error: any) {
      if (error.response.data.message) {
        enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
      } else {
        enqueueSnackbar('Error creando categoría', { variant: 'error' })
      }
    } finally {
      setShowModal(false)
      setUpdateLoading(false)
    }
  }
  return (
    <DetailsWrapper>
      <Grid textAlign={'center'} item xs={12}>
        <h1>Crear Categoría</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="firstName"
          label="Nombre"
          variant="filled"
          value={itemCategory.name}
          onChange={(e) => {
            setItemCategory({ ...itemCategory, name: e.target.value })
          }}
          required
        />
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
          disabled={!isCategoryValid()}
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
        <DialogTitle id="alert-dialog-title">{'¿Crear categoría?'}</DialogTitle>
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

export default ItemCategoryCreate
