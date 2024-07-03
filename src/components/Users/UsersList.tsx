import { User as UserType } from '../../types/user'

import { Grid, List, Typography, styled } from '@mui/material'

import User from './User'

type props = { users: UserType[] }
const UsersList = ({ users }: props) => {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }))

  if (users.length > 0) {
    return (
      <div>
        UsersList comp
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            <List dense={false}>
              {users.map((user, index) => (
                <User key={index} user={user} />
              ))}
            </List>
          </Demo>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      UsersList comp <br />
      Ningún usuario para mostrar
    </div>
  )
}

export default UsersList
