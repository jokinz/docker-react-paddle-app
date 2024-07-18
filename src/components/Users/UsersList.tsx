import { User as UserType } from '../../types/user'

import { Grid, List } from '@mui/material'

import UserItem from './UserItem'

type props = { users: UserType[] }
const UsersList = ({ users }: props) => {
  if (users.length > 0) {
    return (
      <div>
        Lista de usuarios
        <Grid item xs={12} md={6}>
          <List dense={false}>
            {users.map((user, index) => (
              <UserItem key={index} user={user} />
            ))}
          </List>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      <h1>Lista de usuarios</h1>
      Ningún usuario para mostrar
    </div>
  )
}

export default UsersList
