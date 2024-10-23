import { useContext, useEffect, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
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

import { createPlayingField } from '../../api/playingField'

import { NewPlayingField } from '../../types/playingField'

import { EmployeeContext } from '../../contexts/EmployeeContext'

import { getAllEstablishments } from '../../api/establishments'
import { Establishment } from '../../types/establishment'
import DetailsWrapper from '../DetailsWrapper'
import LoadingWrapper from '../LoadingWrapper'
import GridTitle from '../GridTitle'

const starterNewPlayingField: NewPlayingField = {
  name: '',
  description: '',
  price: 0,
  establishmentId: 0,
  thumbnail: '',
}

const PlayingFieldCreate = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [playingField, setPlayingField] = useState<NewPlayingField>(
    starterNewPlayingField
  )
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [establishments, setEstablishments] = useState<
    Pick<Establishment, 'id' | 'name'>[]
  >([])

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  useEffect(() => {
    const getEstablishments = async () => {
      if (token) {
        try {
          const response = await getAllEstablishments(token)
          if (response) {
            setEstablishments(response)
          }
        } catch (error) {
          enqueueSnackbar(`Error cargando las categorías`, { variant: 'error' })
        }
      }
    }
    getEstablishments()
  }, [])

  const resetPlayingField = () => {
    setPlayingField(starterNewPlayingField)
    setThumbnail(null)
  }

  const handleCreateClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const isPlayingFieldValid = (): boolean => {
    if (
      playingField.name === '' ||
      playingField.price === 0 ||
      playingField.establishmentId === 0 ||
      playingField.thumbnail === ''
    ) {
      return false
    } else {
      return true
    }
  }

  const handleEstablishmentChange = (event: SelectChangeEvent) => {
    setPlayingField({
      ...playingField,
      establishmentId: parseInt(event.target.value),
    })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPlayingField((prev) => {
          return { ...prev, thumbnail: reader.result as string }
        })
        setThumbnail(file)
      }
      reader.readAsDataURL(file)
    } else {
      setPlayingField((prev) => {
        return { ...prev, thumbnail: '' }
      })
      setThumbnail(null)
    }
  }

  const handleConfirmationClick = async () => {
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        const response = await createPlayingField(playingField, token, true)
        if (response) {
          setShowModal(false)
          enqueueSnackbar('Campo de juego creado', { variant: 'success' })
          resetPlayingField()
        }
      }
    } catch (error: any) {
      if (error.response.data.message) {
        enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
      } else {
        enqueueSnackbar('Error creando campo de juego', { variant: 'error' })
      }
    } finally {
      setShowModal(false)
      setUpdateLoading(false)
    }
  }
  return (
    <DetailsWrapper>
      <GridTitle>Crear campo de juego</GridTitle>
      <Grid item xs={6}>
        <TextField
          id="name"
          label="Nombre"
          variant="filled"
          required
          value={playingField.name}
          onChange={(e) =>
            setPlayingField((prev) => {
              return { ...prev, name: e.target.value }
            })
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="description"
          label="Descripción"
          variant="filled"
          value={playingField.description}
          onChange={(e) =>
            setPlayingField((prev) => {
              return { ...prev, description: e.target.value }
            })
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="price"
          label="Precio"
          type="number"
          variant="filled"
          required
          value={playingField.price}
          onChange={(e) =>
            setPlayingField((prev) => {
              if (e.target.value === '') {
                return { ...prev, price: 0 }
              } else {
                return { ...prev, price: parseInt(e.target.value) }
              }
            })
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-label">Establecimiento</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={playingField.establishmentId.toString()}
            label="Tipo"
            onChange={handleEstablishmentChange}
          >
            <MenuItem disabled value={0}>
              ---
            </MenuItem>
            {establishments.map((establishment, index) => (
              <MenuItem key={index} value={establishment.id}>
                {establishment.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {thumbnail && (
        <Grid item xs={12}>
          <img
            style={{ display: 'block', maxWidth: '100%' }}
            src={URL.createObjectURL(thumbnail)}
          />
        </Grid>
      )}

      <Grid item xs={6}>
        <input
          required
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={handleImageChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          disabled={!isPlayingFieldValid()}
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
        <DialogTitle id="alert-dialog-title">
          {'¿Crear campo de juego?'}
        </DialogTitle>
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

export default PlayingFieldCreate
