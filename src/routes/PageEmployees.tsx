import { useCallback, useContext, useEffect, useState } from 'react'

import _ from 'lodash'

import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material'

import { Employee, EmployeeRoleResponse } from '../types/employee'

import { getEmployees } from '../api/employees/employee'

import Drawer from '../components/Drawer'
import EmployeesList from '../components/Employees/EmployeesList'
import LoadingWrapper from '../components/LoadingWrapper'

import { EmployeeContext } from '../contexts/EmployeeContext'
import { enqueueSnackbar } from 'notistack'
import { getAllEmployeeRoles } from '../api/employees/employeeRole'
import SkeletonTable from '../components/SkeletonTable'

const PageEmployees = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [employeesList, setEmployeesList] = useState<Employee[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [includeDisabled, setIncludeDisabled] = useState<boolean>(true)
  const [employeeRoles, setEmployeeRoles] = useState<EmployeeRoleResponse[]>([])
  const [selectedRole, setSelectedRole] = useState<1 | 2 | 3 | 0>(0)

  const [loading, setLoading] = useState(true)

  const debouncedSearch = useCallback(
    _.debounce(async (newValue: string) => {
      await handleSearchEmployees(newValue)
    }, 1000),
    []
  )

  useEffect(() => {
    const getEmployeeRoles = async () => {
      if (token) {
        try {
          const response = await getAllEmployeeRoles(token)
          if (response) {
            setEmployeeRoles(response)
          }
        } catch (error) {
          enqueueSnackbar(`Error cargando los roles`, { variant: 'error' })
        }
      }
    }
    getEmployeeRoles()
  }, [])

  const handleSearchEmployees = async (newValue: string) => {
    try {
      if (newValue !== '' && token && token !== '') {
        setLoading(true)
        const result = await getEmployees(
          { search: newValue, includeDisabled: includeDisabled ? 1 : 0 },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token && token !== '') {
          setLoading(true)
          if (searchValue === '') {
            const result = await getEmployees(
              {
                search: searchValue,
                includeDisabled: includeDisabled ? 1 : 0,
                records: 5,
                ...(selectedRole !== 0 ? { roleId: selectedRole } : {}),
              },
              token
            )
            if (result) {
              setEmployeesList(result)
            } else {
              setEmployeesList([])
            }
          } else {
            debouncedSearch(searchValue)
          }
        }
      } catch (error) {
        setEmployeesList([])
        enqueueSnackbar(`Error cargando trabajadores`, { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchValue, debouncedSearch, selectedRole, includeDisabled])

  const handleIncludeDisabledClick = () => {
    setIncludeDisabled((prev) => !prev)
  }

  const handleRoleTypeChange = (event: SelectChangeEvent) => {
    setSelectedRole(parseInt(event.target.value) as 0 | 1 | 2 | 3)
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
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                aria-label="Activado"
                checked={includeDisabled}
                onClick={handleIncludeDisabledClick}
              />
            }
            label="Incluir desactivados"
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-label">
              Rol del trabajador
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRole.toString()}
              label="Tipo"
              onChange={handleRoleTypeChange}
            >
              <MenuItem value={0}>Todos</MenuItem>
              {employeeRoles.map((role, index) => (
                <MenuItem key={index} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* {searchValue === '' && <h3>Empiece a escribir para buscar</h3>} */}
      <LoadingWrapper loading={loading} skeleton={<SkeletonTable />}>
        <EmployeesList employees={employeesList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageEmployees
