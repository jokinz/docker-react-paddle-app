import './App.css'

import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import {
  EmployeeContext,
  EmployeeContextType,
} from './contexts/EmployeeContext.ts'

import PageDashboard from './routes/PageDashboard.tsx'
import PageEmployees from './routes/PageEmployees.tsx'
import PageLogin from './routes/PageLogin.tsx'
import PageNotFound from './routes/PageNotFound.tsx'
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
  ])

  const [employee, setEmployee] = useState<Employee | null>(null)
  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </EmployeeContext.Provider>
  )
}

export default App
