import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import App from './App.tsx'
import PageLogin from './routes/PageLogin.tsx'
import PageMyAccount from './routes/PageMyAccount.tsx'
import PageReserves from './routes/PageReserves.tsx'
import PageUsers from './routes/PageUsers.tsx'
import PageNotFound from './routes/PageNotFound.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
