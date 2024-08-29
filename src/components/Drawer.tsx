import { useContext } from 'react'

import { Grid, ListItemButton, ListItemText } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MUIDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { EmployeeContext } from '../contexts/EmployeeContext'

import ButtonLogout from './ButtonLogout'
import MenuLink from './MenuLink'
import { url } from '../url'

const menuLinksList: { text: string; url: string; allowedRoles?: number[] }[] =
  [
    { text: 'Inicio', url: `/` },
    { text: 'Reservas', url: `/${url.web.reservations}` },
    { text: 'Usuarios', url: `/${url.web.users}` },
    { text: 'Items', url: `/${url.web.items}`, allowedRoles: [2, 3] },
    { text: 'Categorías', url: `/${url.web.categories}`, allowedRoles: [2, 3] },
    { text: 'Campos', url: `/${url.web.playingFields}`, allowedRoles: [2, 3] },
    { text: 'Trabajadores', url: `/${url.web.employees}`, allowedRoles: [3] },
    { text: 'Establecimientos', url: `/${url.web.establishments}`, allowedRoles: [3] },
  ]

const drawerWidth = 250

const Drawer = ({ children }: { children: React.ReactNode }) => {
  const employeeContext = useContext(EmployeeContext)
  const LinkList = menuLinksList
    .filter((item) => {
      if (!item.allowedRoles) {
        return true
      }
      return item.allowedRoles.includes(
        employeeContext?.employee?.role.id as number
      )
    })
    .map((item, index) => (
      <ListItem key={index} disablePadding>
        <ListItemButton>
          <ListItemText
            primary={<MenuLink to={item.url}>{item.text}</MenuLink>}
          />
        </ListItemButton>
      </ListItem>
    ))
  return (
    <Box sx={{ display: 'flex' }}>
      <p>test</p>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Padle App
          </Typography>
        </Toolbar>
      </AppBar>
      <MUIDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Grid container direction={'column'}>
            <Typography variant="h6">
              {`${employeeContext?.employee?.firstName} ${employeeContext?.employee?.lastName}`}
            </Typography>
            <Typography variant="subtitle2">
              {`${employeeContext?.employee?.role.roleName}`}
            </Typography>
          </Grid>
        </Toolbar>
        <Divider />
        <List>
          {LinkList}
          <ButtonLogout />
        </List>
      </MUIDrawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Drawer
