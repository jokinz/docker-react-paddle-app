import { useContext, useRef, useState } from 'react'

import { PlayingField, UpdatePlayingField } from '../../types/playingField'

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { areValuesDifferent, getDifferences } from '../../utils'

import { EmployeeContext } from '../../contexts/EmployeeContext'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'
import { updatePlayingFieldById } from '../../api/playingField'

type props = {
  playingField: PlayingField
  updatePlayingField: (updatedPlayingField: PlayingField) => void
}

const PlayingFieldDetails = ({ playingField, updatePlayingField }: props) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const initialPlayingField = useRef(playingField)
  const [newThumbnail, setNewThumbnail] = useState<string | null>(null)

  const imgSrc = playingField.thumbnail
    ? newThumbnail
      ? newThumbnail
      : playingField.thumbnail
    : ''

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const handleUpdateButtonClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const isPlayingFieldValid = (): boolean => {
    if (
      playingField.name === '' ||
      playingField.description === '' ||
      playingField.price === 0
    ) {
      return false
    } else {
      return true
    }
  }

  const handleConfirmationClick = async () => {
    const oldPlayingField: UpdatePlayingField = {
      name: initialPlayingField.current.name,
      description: initialPlayingField.current.description,
      price: initialPlayingField.current.price,
      enabled: initialPlayingField.current.enabled,
      establishmentId: initialPlayingField.current.establishmentId,
    }
    const newPlayingField: UpdatePlayingField = {
      name: playingField.name,
      description: playingField.description,
      price: playingField.price,
      enabled: playingField.enabled,
      establishmentId: playingField.establishmentId,
    }
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        if (newThumbnail) {
          const result = await updatePlayingFieldById(
            playingField.id,
            {
              ...getDifferences(oldPlayingField, newPlayingField),
              thumbnail: newThumbnail,
            },
            token
          )
          if (result) {
            enqueueSnackbar('Campo de juego actualizado', { variant: 'success' })
          }
        } else {
          const result = await updatePlayingFieldById(
            playingField.id,
            getDifferences(oldPlayingField, newPlayingField),
            token
          )
          if (result) {
            enqueueSnackbar('Campo de juego actualizado', { variant: 'success' })
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
    const updatedEnabled = !playingField.enabled
    const updatedPlayingField = { ...playingField, enabled: updatedEnabled }
    updatePlayingField(updatedPlayingField)
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
        <h1>Actualizar campo de juego</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="name"
          label="Nombre"
          variant="filled"
          value={playingField.name}
          onChange={(e) =>
            updatePlayingField({ ...playingField, name: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="description"
          label="Descripción"
          variant="filled"
          value={playingField.description}
          onChange={(e) =>
            updatePlayingField({ ...playingField, description: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="price"
          label="Precio"
          type="number"
          variant="filled"
          value={playingField.price}
          onChange={(e) => {
            if (e.target.value === '') {
              updatePlayingField({ ...playingField, price: 0 })
            } else {
              updatePlayingField({
                ...playingField,
                price: parseInt(e.target.value),
              })
            }
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch
              aria-label="Activado"
              checked={playingField.enabled}
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
            (!areValuesDifferent(playingField, initialPlayingField.current) ||
              !isPlayingFieldValid()) &&
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
          {'¿Actualizar el campo de juego?'}
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

export default PlayingFieldDetails
