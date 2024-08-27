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
import PageEmployeeCreate from './routes/PageEmployeeCreate.tsx'
import PageEmployees from './routes/PageEmployees.tsx'
import PageEmployeeSingle from './routes/PageEmployeeSingle.tsx'
import PageItems from './routes/PageItems.tsx'
import PageLogin from './routes/PageLogin.tsx'
import PageNotFound from './routes/PageNotFound.tsx'
import PageReservations from './routes/PageReservations.tsx'
import PageReservationSingle from './routes/PageReservationSingle.tsx'
import PageUsers from './routes/PageUsers.tsx'
import PageUserSingle from './routes/PageUserSingle.tsx'

import ForceLogin from './components/ForceLogin.tsx'
import LoadingWrapper from './components/LoadingWrapper.tsx'

import { BOHEMIA_PADEL_JWT } from './types/userCookie.ts'
import PageItemSingle from './routes/PageItemSingle.tsx'
import PageItemCreate from './routes/PageItemCreate.tsx'
import PageCategorySingle from './routes/PageCategorySingle.tsx'
import PageCategoryCreate from './routes/PageCategoryCreate.tsx'
import PageCategories from './routes/PageCategories.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ForceLogin>
          <PageDashboard />
        </ForceLogin>
      ),
      errorElement: <PageNotFound />,
    },
    {
      path: '/login',
      element: <PageLogin />,
    },
    {
      path: '/reservations',
      element: (
        <ForceLogin>
          <PageReservations />
        </ForceLogin>
      ),
    },
    {
      path: '/reservations/:reservationId',
      element: (
        <ForceLogin>
          <PageReservationSingle />
        </ForceLogin>
      ),
    },
    {
      path: '/users',
      element: (
        <ForceLogin>
          <PageUsers />
        </ForceLogin>
      ),
    },
    {
      path: '/users/:userId',
      element: (
        <ForceLogin>
          <PageUserSingle />
        </ForceLogin>
      ),
    },
    {
      path: '/employees',
      element: (
        <ForceLogin requiredRole={[3]}>
          <PageEmployees />
        </ForceLogin>
      ),
    },
    {
      path: '/employees/:employeeId',
      element: (
        <ForceLogin requiredRole={[3]}>
          <PageEmployeeSingle />
        </ForceLogin>
      ),
    },
    {
      path: '/employees/create',
      element: (
        <ForceLogin requiredRole={[3]}>
          <PageEmployeeCreate />
        </ForceLogin>
      ),
    },
    {
      path: '/items',
      element: (
        <ForceLogin>
          <PageItems />
        </ForceLogin>
      ),
    },
    {
      path: '/items/:itemId',
      element: (
        <ForceLogin>
          <PageItemSingle />
        </ForceLogin>
      ),
    },
    {
      path: '/items/create',
      element: (
        <ForceLogin>
          <PageItemCreate />
        </ForceLogin>
      ),
    },
    {
      path: '/categories',
      element: (
        <ForceLogin>
          <PageCategories />
        </ForceLogin>
      ),
    },
    {
      path: '/categories/:categoryId',
      element: (
        <ForceLogin>
          <PageCategorySingle />
        </ForceLogin>
      ),
    },
    {
      path: '/categories/create',
      element: (
        <ForceLogin>
          <PageCategoryCreate />
        </ForceLogin>
      ),
    },
  ])

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const [cookies] = useCookies([BOHEMIA_PADEL_JWT])
  useEffect(() => {
    const userCookie = cookies[BOHEMIA_PADEL_JWT]
    if (userCookie && userCookie?.data && userCookie?.token) {
      setEmployee(userCookie.data)
      setToken(userCookie.token)
    } else {
      setEmployee(null)
      setToken('')
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
        <EmployeeContext.Provider value={{ employee, token, setEmployee }}>
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
