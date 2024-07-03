import './App.css'

import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { UserContext, UserContextType } from './contexts/UserContext.ts'

import PageDashboard from './routes/PageDashboard.tsx'
import PageEmployees from './routes/PageEmployees.tsx'
import PageLogin from './routes/PageLogin.tsx'
import PageMyAccount from './routes/PageMyAccount.tsx'
import PageNotFound from './routes/PageNotFound.tsx'
import PageReserves from './routes/PageReserves.tsx'
import PageUsers from './routes/PageUsers.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PageDashboard />,
      errorElement: <PageNotFound />,
    },
    {
      path: '/my-account',
      element: <PageMyAccount />,
    },
    {
      path: '/reserves',
      element: <PageReserves />,
    },
    {
      path: '/login',
      element: <PageLogin />,
    },
    {
      path: '/users',
      element: <PageUsers />,
    },
    {
      path: '/employees',
      element: <PageEmployees />,
    },
  ])

  const [user, setUser] = useState<UserContextType>(null)
  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App
