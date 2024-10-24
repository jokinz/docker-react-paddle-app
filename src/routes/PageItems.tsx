import { useCallback, useContext, useEffect, useState } from 'react'

import _ from 'lodash'

import { Box, Button, FormControlLabel, Grid, Switch, TextField } from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { Item } from '../types/item'

import { getItems } from '../api/items/item'

import Drawer from '../components/Drawer'
import ItemsList from '../components/Items/ItemsList'
import LoadingWrapper from '../components/LoadingWrapper'
import SkeletonTable from '../components/SkeletonTable'
import { url } from '../url'
import { useNavigate } from 'react-router-dom'

const PageItems = () => {
  const navigate = useNavigate()
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
      setItemsList([])
      enqueueSnackbar(`Error cargando ítems`, { variant: 'error' })
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
          } else {
            debouncedSearch(searchValue)
          }
        }
      } catch (error) {
        setItemsList([])
        enqueueSnackbar('Error cargando items', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [searchValue, debouncedSearch, includeDisabled])

  const handleIncludeDisabledClick = () => {
    setIncludeDisabled((prev) => !prev)
  }

  return (
    <Drawer>
      <Box display={'flex'} alignItems={'center'}>
        <h1>Página Ítems</h1>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={() => navigate(`/${url.web.items}/create`)}
        >
          Crear Ítem
        </Button>
      </Box>
      <Grid container gap={2}>
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
      <LoadingWrapper
        loading={loading}
        skeleton={<SkeletonTable numColumns={4} showAvatar />}
      >
        <ItemsList items={itemsList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageItems
