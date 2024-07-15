import './App.css'

import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { SnackbarProvider } from 'notistack'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { EmployeeContext } from './contexts/EmployeeContext.ts'

import { employeeExample } from './api/dummy.ts'
import PageDashboard from './routes/PageDashboard.tsx'
import PageEmployees from './routes/PageEmployees.tsx'
import PageItems from './routes/PageItems.tsx'
import PageLogin from './routes/PageLogin.tsx'
import PageNotFound from './routes/PageNotFound.tsx'
import PagePayments from './routes/PagePayments.tsx'
import PageReserves from './routes/PageReserves.tsx'
import PageUsers from './routes/PageUsers.tsx'
import { Employee } from './types/employee.ts'

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
    {
      path: '/items',
      element: <PageItems />,
    },
    {
      path: '/payments',
      element: <PagePayments />,
    },
  ])

  const [employee, setEmployee] = useState<Employee | null>(employeeExample)
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={1000}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <EmployeeContext.Provider value={{ employee, setEmployee }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </EmployeeContext.Provider>
    </SnackbarProvider>
  )
}

export default App
