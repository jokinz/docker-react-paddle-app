import { useContext, useState } from 'react'

import { Button, TextField } from '@mui/material'

import { employeeExample, emulateApiCall } from '../api/dummy'
import { EmployeeContext } from '../contexts/EmployeeContext'

const PageLogin = () => {
  const employeeContext = useContext(EmployeeContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLoginClick = async () => {
    try {
      const response = await emulateApiCall(employeeExample, 'success')
      console.log(response)
    } catch (error) {}
  }
  const handleLoginClickAdmin = async () => {
    const response = await emulateApiCall(
      { ...employeeExample, idRole: 1 },
      'success'
    )
    employeeContext?.setEmployee({ ...employeeExample, idRole: 1 })
    console.log(response)
  }
  const handleLoginClickOperator = async () => {
    const response = await emulateApiCall(
      { ...employeeExample, idRole: 2 },
      'success'
    )
    employeeContext?.setEmployee({ ...employeeExample, idRole: 2 })
    console.log(response)
  }
  const handleLoginClickCounter = async () => {
    const response = await emulateApiCall(
      { ...employeeExample, idRole: 3 },
      'success'
    )
    employeeContext?.setEmployee({ ...employeeExample, idRole: 3 })
    console.log(response)
  }
  const handleLoginClickDisabled = async () => {
    const response = await emulateApiCall(
      { ...employeeExample, idRole: 3, enabled: false },
      'success'
    )
    employeeContext?.setEmployee({ ...employeeExample, idRole: 1, enabled: false })
    console.log(response)
  }
  return (
    <div>
      <TextField
        type="email"
        id="email"
        label="Correo electrónico"
        variant="filled"
        value={email}
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        id="password"
        label="Contraseña"
        variant="filled"
        value={password}
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLoginClick}>
        Iniciar Sesión
      </Button>
      <Button variant="contained" onClick={handleLoginClickAdmin}>
        Iniciar Sesión c/Admin
      </Button>
      <Button variant="contained" onClick={handleLoginClickOperator}>
        Iniciar Sesión c/Operario
      </Button>
      <Button variant="contained" onClick={handleLoginClickCounter}>
        Iniciar Sesión c/Counter
      </Button>
      <Button variant="contained" onClick={handleLoginClickDisabled}>
        Iniciar Sesión c/deshabilitado
      </Button>
    </div>
  )
}

export default PageLogin
