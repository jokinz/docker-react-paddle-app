import {
  Avatar,
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { Employee as EmployeeType } from '../../types/employee'

type props = { employee: EmployeeType }
const Employee = ({ employee }: props) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <Icon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <Icon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${employee.firstName} ${employee.lastName}`}
        secondary={`Access Level: ${employee.role.accessLevel}`}
      />
    </ListItem>
  )
}

export default Employee
