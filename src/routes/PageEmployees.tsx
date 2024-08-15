import { useCallback, useEffect, useState } from 'react'

import _ from 'lodash'

import { Grid, TextField } from '@mui/material'

import { useCookies } from 'react-cookie'

import { Employee } from '../types/employee'

import { getEmployees } from '../api/employees/employee'

import Drawer from '../components/Drawer'
import EmployeesList from '../components/Employees/EmployeesList'
import LoadingWrapper from '../components/LoadingWrapper'

import { BOHEMIA_PADEL_JWT } from '../types/userCookie'

const PageEmployees = () => {
  const [cookies] = useCookies([BOHEMIA_PADEL_JWT])
  const token = cookies[BOHEMIA_PADEL_JWT].token

  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(true)

  const debouncedSearch = useCallback(
    _.debounce(async (newValue: string) => {
      await handleSearchEmployees(newValue)
    }, 1000),
    []
  )

  useEffect(() => {
    debouncedSearch(searchValue)
    return debouncedSearch.cancel
  }, [searchValue, debouncedSearch])

  const handleSearchEmployees = async (newValue: string) => {
    try {
      if (newValue !== '') {
        setLoading(true)
        const result = await getEmployees({ search: newValue, includeDisabled: 1 }, token)
        if (result) {
          setEmployeeList(result)
        } else {
          setEmployeeList([])
        }
      }
    } catch (error) {
      setEmployeeList([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer>
      <h1>Página trabajadores</h1>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="searchValue"
            label="Nombre/Apellido/Correo electrónico de trabajador"
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
          <EmployeesList employees={employeeList} />
        </LoadingWrapper>
      )}
    </Drawer>
  )
}

export default PageEmployees
