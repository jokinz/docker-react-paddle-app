import { ListItemButton, ListItemText } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MUIDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import ButtonLogout from './ButtonLogout'
import MenuLink from './MenuLink'

const menuLinksList: { text: string; url: string }[] = [
  { text: 'Inicio', url: '/' },
  { text: 'Reservas', url: '/reserves' },
  { text: 'Usuarios', url: '/users' },
  { text: 'Trabajadores', url: '/employees' },
  { text: 'Pagos', url: '/payments' },
]

const drawerWidth = 240

export default function Drawer({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
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
        <Toolbar />
        <Divider />
        <List>
          {menuLinksList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={<MenuLink to={item.url}>{item.text}</MenuLink>}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <ButtonLogout />
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
