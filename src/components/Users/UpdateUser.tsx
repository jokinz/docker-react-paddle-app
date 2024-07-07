import { useState } from 'react'

import { User } from '../../types/user'

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { updateUserById } from '../../api/users/user'
type props = {
  user: User
}

const UpdateUser = ({ user }: props) => {
  const [userData, setUserData] = useState<User>(user)
  const handleDocumentTypeChange = (event: SelectChangeEvent) => {
    setUserData((prevUserData) => {
      return { ...prevUserData, documentType: event.target.value }
    })
  }
  const handleDistrictChange = (event: SelectChangeEvent) => {
    setUserData((prevUserData) => {
      return { ...prevUserData, district: event.target.value }
    })
  }
  const handleUpdateUserClick = async () => {
    const response = await updateUserById(userData)
    console.log(response)
  }
  return (
    <Grid container width={'50%'} rowSpacing={3} gridColumn={2}>
      <Grid item xs={12}>
        <h1>Actualizar usuario</h1>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="firstName"
          label="Nombre"
          variant="filled"
          value={userData.firstName}
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, firstName: e.target.value }
            })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="lastName"
          label="Apellido"
          variant="filled"
          value={userData.lastName}
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, lastName: e.target.value }
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="email"
          id="email"
          label="Correo electrónico"
          variant="filled"
          value={userData.email}
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, email: e.target.value }
            })
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-label">
            Tipo de documento
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userData.documentType}
            label="Tipo"
            onChange={handleDocumentTypeChange}
          >
            <MenuItem value={'dni'}>DNI</MenuItem>
            <MenuItem value={'other'}>Otro</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="documentNumber"
          label="N° de documento"
          variant="filled"
          value={userData.documentNumber}
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, documentNumber: e.target.value }
            })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-label">Distrito</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userData.district}
            label="Distrito"
            onChange={handleDistrictChange}
          >
            <MenuItem value={'d1'}>d1</MenuItem>
            <MenuItem value={'d2'}>d2</MenuItem>
            <MenuItem value={'d3'}>d3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          type="tel"
          id="tel"
          label="Teléfono"
          variant="filled"
          value={userData.phone}
          onChange={(e) =>
            setUserData((prev) => {
              return { ...prev, phone: e.target.value }
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleUpdateUserClick}>
          Actualizar usuario
        </Button>
      </Grid>
    </Grid>
  )
}

export default UpdateUser
