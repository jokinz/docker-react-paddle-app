import { Button } from '@mui/material'

const PageDashboard = () => {
  return (
    <div>
      Página dashboard
      <div>
        <Button variant="outlined" href="/login">
          Login
        </Button>
      </div>
      <div>
        <Button variant="outlined" href="/reserves">
          Reservas
        </Button>
      </div>
      <div>
        <Button variant="outlined" href="/users">
          Usuarios
        </Button>
      </div>
      <div>
        <Button variant="outlined" href="/employees">
          Empleados
        </Button>
      </div>
      <div>
        <Button variant="outlined" href="/payments">
          Pagos
        </Button>
      </div>
    </div>
  )
}

export default PageDashboard
