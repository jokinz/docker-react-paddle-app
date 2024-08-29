import { useCallback, useContext, useEffect, useState } from 'react'

import _ from 'lodash'

import { Grid, TextField } from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { ItemCategory } from '../types/item'

import { getAllItemCategories } from '../api/items/itemCategory'
import Drawer from '../components/Drawer'
import ItemCategoriesList from '../components/Items/ItemCategoriesList'
import LoadingWrapper from '../components/LoadingWrapper'
import SkeletonTable from '../components/SkeletonTable'

const PageCategories = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [itemCategoriesList, setItemCategoriesList] = useState<ItemCategory[]>(
    []
  )
  const [searchValue, setSearchValue] = useState('')

  const [loading, setLoading] = useState(true)

  const debouncedSearch = useCallback(
    _.debounce(async (newValue: string) => {
      await handleSearchCategories(newValue)
    }, 1000),
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token && token !== '') {
          setLoading(true)
          if (searchValue === '') {
            const result = await getAllItemCategories(token)
            if (result) {
              setItemCategoriesList(result)
            } else {
              setItemCategoriesList([])
            }
          } else {
            debouncedSearch(searchValue)
          }
        }
      } catch (error) {
        enqueueSnackbar('Error descargando categorías', { variant: 'error' })
        setItemCategoriesList([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [searchValue, debouncedSearch])

  const handleSearchCategories = async (newValue: string) => {
    try {
      if (newValue !== '' && token && token !== '') {
        setLoading(true)
        const result = await getAllItemCategories(token)
        if (result) {
          setItemCategoriesList(result)
        } else {
          setItemCategoriesList([])
        }
      }
    } catch (error) {
      enqueueSnackbar(`Error cargando ítems`, { variant: 'error' })
      setItemCategoriesList([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer>
      <h1>Página Categorías</h1>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="searchValue"
            label="Nombre"
            variant="filled"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Grid>
      </Grid>
      <LoadingWrapper
        loading={loading}
        skeleton={<SkeletonTable numColumns={1} showAvatar />}
      >
        <ItemCategoriesList categories={itemCategoriesList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageCategories
