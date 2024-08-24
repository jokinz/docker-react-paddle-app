import { useNavigate } from 'react-router-dom'

import {
  Avatar,
  Grid,
  Icon,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import { Employee as EmployeeType } from '../../types/employee'

type props = { employee: EmployeeType }
const EmployeeItem = ({ employee }: props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/employees/${employee.id}`)
  }
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Icon />
        </Avatar>
      </ListItemAvatar>
      <ListItemButton onClick={handleClick}>
        <Grid container display={'flex'} alignItems={'center'}>
          <ListItemText
            primary={`${employee.firstName} ${employee.lastName}`}
          />
          <Grid item xs={3}>
            Email: <b>{employee.email}</b>
          </Grid>
          <Grid item xs={3}>
            Habilitado: <b>{employee.enabled ? 'Sí' : 'No'}</b>
          </Grid>
          <Grid item xs={3}>
            Rol: <b>{employee.role.roleName}</b>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

export default EmployeeItem
