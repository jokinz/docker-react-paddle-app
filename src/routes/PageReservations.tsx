import { useCallback, useContext, useEffect, useState } from 'react'

import _ from 'lodash'

import { getReservations } from '../api/reservations'

import { Grid, TextField } from '@mui/material'

import { Reservation } from '../types/reservation'

import { enqueueSnackbar } from 'notistack'
import Drawer from '../components/Drawer'
import LoadingWrapper from '../components/LoadingWrapper'
import ReservationsList from '../components/Reservations/ReservationsList'
import SkeletonTable from '../components/SkeletonTable'
import { EmployeeContext } from '../contexts/EmployeeContext'

const PageReservations = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [reservationsList, setReservationsList] = useState<Reservation[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(true)

  const debouncedSearch = useCallback(
    _.debounce(async (newValue: string) => {
      await handleSearchReservations(newValue)
    }, 1000),
    []
  )

  const handleSearchReservations = async (newValue: string) => {
    try {
      if (newValue !== '' && token && token !== '') {
        setLoading(true)
        const result = await getReservations({ search: newValue }, token)
        if (result) {
          setReservationsList(result)
        } else {
          setReservationsList([])
        }
      }
    } catch (error) {
      setReservationsList([])
      enqueueSnackbar(`Error cargando reservas`, { variant: 'error' })
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
            const result = await getReservations(
              { search: searchValue, records: 5 },
              token
            )
            if (result) {
              setReservationsList(result)
            } else {
              setReservationsList([])
            }
          } else {
            debouncedSearch(searchValue)
          }
        }
      } catch (error) {
        enqueueSnackbar(`Error cargando reservas`, { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchValue, debouncedSearch])

  return (
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
      <LoadingWrapper
        loading={loading}
        skeleton={<SkeletonTable numColumns={5} />}
      >
        <ReservationsList reservations={reservationsList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageReservations
