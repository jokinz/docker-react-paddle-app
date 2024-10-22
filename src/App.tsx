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
import PagePlayingFieldSingle from './routes/PagePlayingFieldSingle.tsx'
import PagePlayingFieldCreate from './routes/PagePlayingFieldCreate.tsx'
import PagePlayingFields from './routes/PagePlayingFields.tsx'
import { url } from './url.ts'
import PageEstablishmentSingle from './routes/PageEstablishmentSingle.tsx'
import PageCreateReservation from './routes/PageCreateReservation.tsx'
import PageCreateClass from './routes/pageCreateClase.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App = () => {
  const router = createBrowserRouter([
    {
      path: `/`,
      element: (
        <ForceLogin>
          <PageDashboard />
        </ForceLogin>
      ),
      errorElement: <PageNotFound />,
    },
    {
      path: `/${url.web.login}`,
      element: <PageLogin />,
    },
    {
      path: `/${url.web.reservations}`,
      element: (
        <ForceLogin>
          <PageReservations />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.createClass}`,
      element: (
        <ForceLogin>
          <PageCreateClass />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.createReservation}`,
      element: (
        <ForceLogin>
          <PageCreateReservation />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.reservations}/:reservationId`,
      element: (
        <ForceLogin>
          <PageReservationSingle />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.users}`,
      element: (
        <ForceLogin>
          <PageUsers />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.users}/:userId`,
      element: (
        <ForceLogin>
          <PageUserSingle />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.employees}`,
      element: (
        <ForceLogin requiredRole={[3]}>
          <PageEmployees />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.employees}/:employeeId`,
      element: (
        <ForceLogin requiredRole={[3]}>
          <PageEmployeeSingle />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.employees}/create`,
      element: (
        <ForceLogin requiredRole={[3]}>
          <PageEmployeeCreate />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.items}`,
      element: (
        <ForceLogin requiredRole={[2, 3]}>
          <PageItems />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.items}/:itemId`,
      element: (
        <ForceLogin requiredRole={[2, 3]}>
          <PageItemSingle />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.items}/create`,
      element: (
        <ForceLogin requiredRole={[2, 3]}>
          <PageItemCreate />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.categories}`,
      element: (
        <ForceLogin requiredRole={[2, 3]}>
          <PageCategories />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.categories}/:categoryId`,
      element: (
        <ForceLogin requiredRole={[2, 3]}>
          <PageCategorySingle />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.categories}/create`,
      element: (
        <ForceLogin requiredRole={[2, 3]}>
          <PageCategoryCreate />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.playingFields}`,
      element: (
        <ForceLogin requiredRole={[2, 3]}>
          <PagePlayingFields />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.playingFields}/create`,
      element: (
        <ForceLogin requiredRole={[2, 3]}>
          <PagePlayingFieldCreate />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.playingFields}/:playingFieldId`,
      element: (
        <ForceLogin requiredRole={[2, 3]}>
          <PagePlayingFieldSingle />
        </ForceLogin>
      ),
    },
    {
      path: `/${url.web.establishments}/:establishmentId`,
      element: (
        <ForceLogin requiredRole={[3]}>
          <PageEstablishmentSingle />
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
