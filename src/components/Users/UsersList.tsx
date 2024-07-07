import { User as UserType } from '../../types/user'

import { Grid, List, styled } from '@mui/material'

import UserItem from './UserItem'

type props = { users: UserType[] }
const UsersList = ({ users }: props) => {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }))

  if (users.length > 0) {
    return (
      <div>
        Lista de usuarios
        <Grid item xs={12} md={6}>
          <Demo>
            <List dense={false}>
              {users.map((user, index) => (
                <UserItem key={index} user={user} />
              ))}
            </List>
          </Demo>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      Lista de usuarios <br />
      Ningún usuario para mostrar
    </div>
  )
}

export default UsersList
