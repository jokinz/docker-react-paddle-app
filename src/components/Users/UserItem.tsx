import { useNavigate } from 'react-router-dom'

import {
  Avatar,
  Grid,
  Icon,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from '@mui/material'

import { User as UserType } from '../../types/user'

type props = { user: UserType }
const UserItem = ({ user }: props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/users/${user.id}`)
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
            primary={`${user.firstName} ${user.lastName}`}
          />
          <Grid item xs={3}>
            Email: <b>{user.email}</b>
          </Grid>
          <Grid item xs={3}>
            Documento: <b>{user.documentNumber}</b>
          </Grid>
          <Grid item xs={3}>
            Teléfono: <b>{user.phone}</b>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

export default UserItem
