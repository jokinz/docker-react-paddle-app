import { useCallback, useContext, useEffect, useState } from 'react'

import _ from 'lodash'

import { Grid, TextField } from '@mui/material'

import { User } from '../types/user'

import { getUsers } from '../api/users/user'

import Drawer from '../components/Drawer'
import LoadingWrapper from '../components/LoadingWrapper'
import UsersList from '../components/Users/UsersList'

import { EmployeeContext } from '../contexts/EmployeeContext'
import { enqueueSnackbar } from 'notistack'

const PageUsers = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [usersList, setUsersList] = useState<User[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(true)

  const debouncedSearch = useCallback(
    _.debounce(async (newValue: string) => {
      await handleSearchUsers(newValue)
    }, 1000),
    []
  )
  useEffect(() => {
    debouncedSearch(searchValue)
    return debouncedSearch.cancel
  }, [searchValue, debouncedSearch])

  useEffect(() => {
    const getFirstUsers = async () => {
      try {
        if (token && token !== '') {
          setLoading(true)
          const result = await getUsers(
            { search: searchValue, records: 5 },
            token
          )
          if (result) {
            setUsersList(result)
          } else {
            setUsersList([])
          }
        }
      } catch (error) {
        setUsersList([])
        enqueueSnackbar(`Error cargando usuarios`, { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }
    getFirstUsers()
  }, [])

  const handleSearchUsers = async (newValue: string) => {
    try {
      if (newValue !== '' && token && token !== '') {
        setLoading(true)
        const result = await getUsers({ search: newValue }, token)
        if (result) {
          setUsersList(result)
        } else {
          setUsersList([])
        }
      }
    } catch (error) {
      setUsersList([])
      enqueueSnackbar(`Error cargando usuarios`, { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Drawer>
      <h1>Página Usuarios</h1>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="searchValue"
            label="Nombre/Apellido/Correo/Documento de usuario"
            variant="filled"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Grid>
      </Grid>
      {searchValue === '' ? (
        <h3>Empiece a escribir para buscar</h3>
      ) : (
        <LoadingWrapper loading={loading}>
          <UsersList users={usersList} />
        </LoadingWrapper>
      )}
    </Drawer>
  )
}

export default PageUsers
