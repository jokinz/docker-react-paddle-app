import { useCallback, useContext, useEffect, useState } from 'react'

import _ from 'lodash'

import { FormControlLabel, Grid, Switch, TextField } from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { Item } from '../types/item'

import { getItems } from '../api/items/item'

import Drawer from '../components/Drawer'
import ItemsList from '../components/Items/ItemsList'
import LoadingWrapper from '../components/LoadingWrapper'

const PageItems = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [itemsList, setItemsList] = useState<Item[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [includeDisabled, setIncludeDisabled] = useState<boolean>(true)
  const [loading, setLoading] = useState(true)

  const debouncedSearch = useCallback(
    _.debounce(async (newValue: string) => {
      await handleSearchItems(newValue)
    }, 1000),
    []
  )

  useEffect(() => {
    debouncedSearch(searchValue)
    return debouncedSearch.cancel
  }, [searchValue, debouncedSearch])

  useEffect(() => {
    const getData = async () => {
      if (token && token !== '') {
        try {
          setLoading(true)
          const result = await getItems(
            {
              search: searchValue,
              includeDisabled: includeDisabled ? 1 : 0,
              records: 5,
            },
            token
          )
          if (result) {
            setItemsList(result)
          } else {
            setItemsList([])
          }
        } catch (error) {
          enqueueSnackbar('Error descargando items', { variant: 'error' })
        } finally {
          setLoading(false)
        }
      } else {
        enqueueSnackbar('Error token no encontrado', { variant: 'error' })
      }
    }
    getData()
  }, [includeDisabled])

  const handleSearchItems = async (newValue: string) => {
    try {
      if (newValue !== '' && token && token !== '') {
        setLoading(true)
        const result = await getItems(
          {
            search: newValue,
            includeDisabled: includeDisabled ? 1 : 0,
            records: 5,
          },
          token
        )
        if (result) {
          setItemsList(result)
        } else {
          setItemsList([])
        }
      }
    } catch (error) {
      enqueueSnackbar(`Error cargando ítems`, { variant: 'error' })
      setItemsList([])
    } finally {
      setLoading(false)
    }
  }

  const handleIncludeDisabledClick = () => {
    setIncludeDisabled((prev) => !prev)
  }

  return (
    <Drawer>
      <h1>Página Ítems</h1>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="searchValue"
            label="Nombre del ítem"
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
      </Grid>
      {/* {searchValue === '' && <h3>Empiece a escribir para buscar</h3>} */}
      <LoadingWrapper loading={loading}>
        <ItemsList items={itemsList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageItems
