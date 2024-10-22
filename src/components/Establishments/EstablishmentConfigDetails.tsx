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
import { EstablishmentConfig } from '../../types/establishment'
import { TimePicker } from '@mui/x-date-pickers'

type props = {
  config: EstablishmentConfig,
  updateConfig: (config: EstablishmentConfig) => void
  reloadPage: () => void
}


const ItemDetails = ({ config, updateConfig, reloadPage }: props) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [showModal, setShowModal] = useState<boolean>(false)
  const [updateLoading, setUpdateLoading] = useState<boolean>(false)

  const handleUpdateButtonClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleConfirmationClick = async () => {
    
  }

  return (
    <DetailsWrapper>
      <Grid textAlign={'center'} item xs={12}>
        <h1>Actualizar configuracion de establecimiento</h1>
      </Grid>
      <Grid item xs={6}>
        <TimePicker
          label="Hora Inicio"
          value={}

        />
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
