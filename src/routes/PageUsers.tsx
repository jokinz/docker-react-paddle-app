import { useCallback, useEffect, useState } from 'react'

import _ from 'lodash'

import { Grid, TextField } from '@mui/material'

import { User } from '../types/user'

import { getAllUsers } from '../api/users/user'

import Drawer from '../components/Drawer'
import ForceLogin from '../components/ForceLogin'
import LoadingWrapper from '../components/LoadingWrapper'
import UsersList from '../components/Users/UsersList'

const PageUsers = () => {
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
      // TODO: update what functions calls
      if (newValue !== '') {
        setLoading(true)
        const result = await getAllUsers()
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
    <ForceLogin>
      <Drawer>
        <h1>Página Usuarios</h1>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="searchValue"
              label="Documento de usuario"
              variant="filled"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
        </Grid>
        <LoadingWrapper loading={loading}>
          <UsersList users={userList} />
        </LoadingWrapper>
      </Drawer>
    </ForceLogin>
  )
}

export default PageUsers
