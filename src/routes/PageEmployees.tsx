import { useCallback, useContext, useEffect, useState } from 'react'

import _ from 'lodash'

import { Grid, TextField } from '@mui/material'

import { Employee } from '../types/employee'

import { getEmployees } from '../api/employees/employee'

import Drawer from '../components/Drawer'
import EmployeesList from '../components/Employees/EmployeesList'
import LoadingWrapper from '../components/LoadingWrapper'

import { EmployeeContext } from '../contexts/EmployeeContext'
import { enqueueSnackbar } from 'notistack'

const PageEmployees = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [employeesList, setEmployeesList] = useState<Employee[]>([])
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

  useEffect(() => {
    const getFirstEmployees = async () => {
      if (token && token !== '') {
        const result = await getEmployees(
          { search: '', includeDisabled: 1, records: 5 },
          token
        )
        if (result) {
          setEmployeesList(result)
        } else {
          setEmployeesList([])
        }
      }
    }
    getFirstEmployees()
  }, [])

  const handleSearchEmployees = async (newValue: string) => {
    try {
      if (newValue !== '' && token && token !== '') {
        setLoading(true)
        const result = await getEmployees(
          { search: newValue, includeDisabled: 1 },
          token
        )
        if (result) {
          setEmployeesList(result)
        } else {
          setEmployeesList([])
        }
      }
    } catch (error) {
      enqueueSnackbar(`Error cargando trabajadores`, { variant: 'error' })
      setEmployeesList([])
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
      {/* {searchValue === '' && <h3>Empiece a escribir para buscar</h3>} */}
      <LoadingWrapper loading={loading}>
        <EmployeesList employees={employeesList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageEmployees
