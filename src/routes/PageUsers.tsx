import { useCallback, useEffect, useState } from 'react'

import _ from 'lodash'

import { Grid, TextField } from '@mui/material'

import { useCookies } from 'react-cookie'

import { User } from '../types/user'

import { getUsers } from '../api/users/user'

import Drawer from '../components/Drawer'
import LoadingWrapper from '../components/LoadingWrapper'
import UsersList from '../components/Users/UsersList'

import { BOHEMIA_PADEL_JWT } from '../types/userCookie'

const PageUsers = () => {
  const [cookies] = useCookies([BOHEMIA_PADEL_JWT])
  const token = cookies[BOHEMIA_PADEL_JWT].token

  const [userList, setUserList] = useState<User[]>([])
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

  const handleSearchUsers = async (newValue: string) => {
    try {
      if (newValue !== '') {
        setLoading(true)
        const result = await getUsers({ search: newValue }, token)
        if (result) {
          setUserList(result)
        } else {
          setUserList([])
        }
      }
    } catch (error) {
      setUserList([])
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
          <UsersList users={userList} />
        </LoadingWrapper>
      )}
    </Drawer>
  )
}

export default PageUsers
