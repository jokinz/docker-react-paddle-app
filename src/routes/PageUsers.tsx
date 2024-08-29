import { useCallback, useContext, useEffect, useState } from 'react'

import _ from 'lodash'

import { Grid, TextField } from '@mui/material'

import { User } from '../types/user'

import { getUsers } from '../api/users/user'

import Drawer from '../components/Drawer'
import LoadingWrapper from '../components/LoadingWrapper'
import UsersList from '../components/Users/UsersList'

import { enqueueSnackbar } from 'notistack'
import SkeletonTable from '../components/SkeletonTable'
import { EmployeeContext } from '../contexts/EmployeeContext'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token && token !== '') {
          setLoading(true)
          if (searchValue === '') {
            const result = await getUsers(
              { search: searchValue, records: 5 },
              token
            )
            if (result) {
              setUsersList(result)
            } else {
              setUsersList([])
            }
          } else {
            debouncedSearch(searchValue)
          }
        }
      } catch (error) {
        setUsersList([])
        enqueueSnackbar(`Error cargando usuarios`, { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchValue, debouncedSearch])

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
      <LoadingWrapper
        loading={loading}
        skeleton={<SkeletonTable numColumns={3} showAvatar />}
      >
        <UsersList users={usersList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageUsers
