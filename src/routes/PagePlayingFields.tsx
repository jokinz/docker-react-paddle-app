import { useCallback, useContext, useEffect, useState } from 'react'

import _ from 'lodash'

import { FormControlLabel, Grid, Switch, TextField } from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { PlayingField } from '../types/playingField'

import { getPlayingFields } from '../api/playingField'

import Drawer from '../components/Drawer'
import PlayingFieldsList from '../components/PlayingFields/PlayingFieldsList'
import LoadingWrapper from '../components/LoadingWrapper'
import SkeletonTable from '../components/SkeletonTable'

const PagePlayingFields = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [playingFieldsList, setPlayingFieldsList] = useState<PlayingField[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [includeDisabled, setIncludeDisabled] = useState<boolean>(true)
  const [loading, setLoading] = useState(true)

  const debouncedSearch = useCallback(
    _.debounce(async (newValue: string) => {
      await handleSearchPlayingFields(newValue)
    }, 1000),
    []
  )

  const handleSearchPlayingFields = async (newValue: string) => {
    try {
      if (newValue !== '' && token && token !== '') {
        setLoading(true)
        const result = await getPlayingFields(
          {
            search: newValue,
            includeDisabled: includeDisabled ? 1 : 0,
            records: 5,
          },
          token
        )
        if (result) {
          setPlayingFieldsList(result)
        } else {
          setPlayingFieldsList([])
        }
      }
    } catch (error) {
      enqueueSnackbar(`Error cargando campos de juego`, { variant: 'error' })
      setPlayingFieldsList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token && token !== '') {
          setLoading(true)
          const result = await getPlayingFields(
            {
              search: searchValue,
              includeDisabled: includeDisabled ? 1 : 0,
              records: 50,
            },
            token
          )
          if (result) {
            setPlayingFieldsList(result)
          } else {
            setPlayingFieldsList([])
          }
        }
      } catch (error) {
        enqueueSnackbar('Error cargando campos de juego', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchValue, debouncedSearch, includeDisabled])

  const handleIncludeDisabledClick = () => {
    setIncludeDisabled((prev) => !prev)
  }

  return (
    <Drawer>
      <h1>Página campos de juego</h1>
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
      <LoadingWrapper loading={loading} skeleton={<SkeletonTable numColumns={3} showAvatar/>}>
        <PlayingFieldsList playingFields={playingFieldsList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PagePlayingFields
