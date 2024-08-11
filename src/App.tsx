import { useEffect, useState } from 'react'

import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { SnackbarProvider } from 'notistack'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { EmployeeContext } from './contexts/EmployeeContext.ts'

import { Employee } from './types/employee.ts'

import { useCookies } from 'react-cookie'

import PageDashboard from './routes/PageDashboard.tsx'
import PageEmployees from './routes/PageEmployees.tsx'
import PageItems from './routes/PageItems.tsx'
import PageLogin from './routes/PageLogin.tsx'
import PageNotFound from './routes/PageNotFound.tsx'
import PagePayments from './routes/PagePayments.tsx'
import PagePaymentSingle from './routes/PagePaymentSingle.tsx'
import PageReserves from './routes/PageReserves.tsx'
import PageReserveSingle from './routes/PageReserveSingle.tsx'
import PageUsers from './routes/PageUsers.tsx'

import LoadingWrapper from './components/LoadingWrapper.tsx'
import { BOHEMIA_PADEL_JWT } from './types/userCookie.ts'

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
      path: '/reserves/:reserveId',
      element: <PageReserveSingle />,
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
    {
      path: '/payments/:paymentId',
      element: <PagePaymentSingle />,
    },
  ])

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)

  const [cookies] = useCookies([BOHEMIA_PADEL_JWT])
  useEffect(() => {
    const userCookie = cookies[BOHEMIA_PADEL_JWT]
    if (userCookie) {
      setEmployee(userCookie.data)
    } else {
      setEmployee(null)
    }
    setLoading(false)
  }, [cookies])
  return (
    <LoadingWrapper loading={loading}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={1500}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <EmployeeContext.Provider value={{ employee, setEmployee }}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </EmployeeContext.Provider>
      </SnackbarProvider>
    </LoadingWrapper>
  )
}

export default App
