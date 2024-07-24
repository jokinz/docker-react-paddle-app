import { useCallback, useEffect, useState } from 'react'

import _ from 'lodash'

import { Reserve } from '../types/reserve'

import { getAllReserves } from '../api/reserves/reserve'

import { Grid, Skeleton, TextField } from '@mui/material'

import Drawer from '../components/Drawer'
import ForceLogin from '../components/ForceLogin'
import LoadingWrapper from '../components/LoadingWrapper'
import ReservesList from '../components/Reserves/ReservesList'
import SkeletonList from '../components/SkeletonList'

const PageReserves = () => {
  const [reserveList, setReserveList] = useState<Reserve[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(true)

  const debouncedSearch = useCallback(
    _.debounce(async (newValue: string) => {
      await handleSearchReserves(newValue)
    }, 1000),
    []
  )
  useEffect(() => {
    debouncedSearch(searchValue)
    return debouncedSearch.cancel
  }, [searchValue, debouncedSearch])

  const handleSearchReserves = async (newValue: string) => {
    try {
      // TODO: update what functions calls
      if (newValue !== '') {
        setLoading(true)
        const result = await getAllReserves()
        if (result) {
          setReserveList(result)
        } else {
          setReserveList([])
        }
      }
    } catch (error) {
      setReserveList([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <ForceLogin>
      <Drawer>
        <h1>Página Reservas</h1>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="searchValue"
              label="Documento/Código de reserva"
              variant="filled"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
        </Grid>
        <LoadingWrapper loading={loading} skeleton={<SkeletonList/>}>
          <ReservesList reserves={reserveList} />
        </LoadingWrapper>
      </Drawer>
    </ForceLogin>
  )
}

export default PageReserves
