import React, { useContext, useEffect, useState } from 'react'

import { UpdateEstablishment } from '../../types/establishment'

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'

import { TimeField } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { updateEstablishmentById } from '../../api/establishments'
import { EmployeeContext } from '../../contexts/EmployeeContext'
import DetailsWrapper from '../DetailsWrapper'
import GridTitle from '../GridTitle'
import LoadingWrapper from '../LoadingWrapper'

type props = {
  establishment: UpdateEstablishment
}

const minDifference: number = 120

const EstablishmentDetails = ({ establishment }: props) => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [showModal, setShowModal] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const [startTime, setStartTime] = useState<Dayjs>(
    dayjs(establishment.startTime, 'HH:mm')
  )
  const [endTime, setEndTime] = useState<Dayjs>(
    dayjs(establishment.endTime, 'HH:mm')
  )
  const [bracketsStartTimes, setBracketsStartTimes] = useState<
    (Dayjs | null)[]
  >([startTime, endTime])
  const [prices, setPrices] = useState<number[]>([0])

  const handleUpdateButtonClick = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleConfirmationClick = async () => {
    const priceBrackets = bracketsStartTimes.map((bracket, index) => {
      const startTime = bracket?.format('HH:mm:ss') as string
      const endTime = bracketsStartTimes[index + 1]?.format(
        'HH:mm:ss'
      ) as string
      const priceOffset = prices[index]
      return { startTime, endTime, priceOffset }
    })
    priceBrackets.length = priceBrackets.length - 1
    try {
      setUpdateLoading(true)
      if (token && token !== '') {
        const result = await updateEstablishmentById(
          establishment.id,
          {
            startTime: startTime?.format('HH:mm:ss'),
            endTime: endTime?.format('HH:mm:ss'),
            priceBrackets: priceBrackets,
          },
          token
        )
        if (result) {
          enqueueSnackbar('Establecimiento actualizado', {
            variant: 'success',
          })
        }
      }
    } catch (error) {
      enqueueSnackbar('Error actualizando', { variant: 'error' })
    } finally {
      setShowModal(false)
      setUpdateLoading(false)
    }
  }

  useEffect(() => {
    if (startTime && endTime && isLessThanMinDifference(startTime, endTime)) {
      setEndTime(startTime.add(minDifference, 'minute'))
    }
    setBracketsStartTimes([startTime, endTime])
  }, [startTime, endTime])

  const handleBracketTimeChange = (newTime: Dayjs | null, index: number) => {
    setBracketsStartTimes((prev) => {
      const newBrackets = [...prev]
      newBrackets[index] = newTime
      return newBrackets
    })
  }

  const handlePriceChange = (
    newPrice: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    setPrices((prev) => {
      const newPrices = [...prev]
      newPrices[index] = parseInt(newPrice.target.value)
      return newPrices
    })
  }

  const addTimeBracket = () => {
    setBracketsStartTimes((prev) => {
      const newBrackets = [...prev]
      newBrackets.splice(
        1,
        0,
        dayjs(prev[0]?.add(minDifference, 'minutes'), 'HH:mm')
      )
      newBrackets[newBrackets.length - 1] = endTime
      return newBrackets
    })
    setPrices((prev) => {
      const newPrices = [...prev]
      newPrices.push(0)
      return newPrices
    })
  }

  const removeTimeBracket = () => {
    setBracketsStartTimes((prev) => {
      const newBrackets = [...prev]
      newBrackets.length -= 1
      newBrackets[newBrackets.length - 1] = endTime
      return newBrackets
    })
    setPrices((prev) => {
      const newBrackets = [...prev]
      newBrackets.length -= 1
      return newBrackets
    })
  }

  const isLessThanMinDifference = (time1: Dayjs, time2: Dayjs): boolean => {
    const minutesDifference = Math.abs(time1.diff(time2, 'minute'))
    return minutesDifference < minDifference || time1.hour() >= time2.hour()
  }

  const maxBrackets = (time1: Dayjs, time2: Dayjs): number => {
    const minutesDifference = Math.abs(time1.diff(time2, 'minute'))
    const result = Math.trunc(minutesDifference / minDifference)
    return result
  }

  const isMaxBrackets = (time1: Dayjs, time2: Dayjs): boolean => {
    return maxBrackets(time1, time2) <= bracketsStartTimes.length - 1
  }

  const getTimeMinusDiff = (time: Dayjs): Dayjs => {
    const minTime = dayjs()
      .set('hour', time.hour())
      .set('minute', time.minute())
      .set('second', 0)
      .subtract(minDifference, 'minute')
    return minTime
  }

  const getTimePlusDiff = (time: Dayjs): Dayjs => {
    const maxTime = dayjs()
      .set('hour', time.hour())
      .set('minute', time.minute())
      .set('second', 0)
      .add(minDifference, 'minute')
    return maxTime
  }

  const hasMinimumDifference = (): boolean => {
    if (bracketsStartTimes.length < 2) return true

    for (let i = 1; i < bracketsStartTimes.length; i++) {
      const previousTime = bracketsStartTimes[i - 1]
      const currentTime = bracketsStartTimes[i]

      const difference = currentTime?.diff(previousTime, 'minute') as number

      if (difference < minDifference) {
        return false
      }
    }

    return true
  }

  const areAllZeros = (): boolean => {
    return prices.every((value) => value === 0)
  }

  return (
    <DetailsWrapper>
      <GridTitle>Actualizar establecimiento</GridTitle>
      <Grid item xs={6}>
        <TimeField
          label="Hora de apertura"
          value={startTime}
          onChange={(newTime) => setStartTime(dayjs(newTime, 'HH:mm'))}
          format="HH:mm"
          ampm={false}
          minutesStep={30}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TimeField
          label="Hora de cierre"
          value={endTime}
          onChange={(newTime) => setEndTime(dayjs(newTime, 'HH:mm'))}
          format="HH:mm"
          ampm={false}
          minutesStep={30}
          fullWidth
        />
      </Grid>
      {bracketsStartTimes
        .slice(0, bracketsStartTimes.length - 1)
        .map((time, index) => {
          return (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <TimeField
                  label="Inicio del bracket"
                  value={time}
                  onChange={(newTime) =>
                    handleBracketTimeChange(newTime, index)
                  }
                  format="HH:mm"
                  ampm={false}
                  disabled={index === 0}
                  minutesStep={30}
                  minTime={
                    index === 0
                      ? (startTime as Dayjs)
                      : getTimePlusDiff(bracketsStartTimes[index - 1] as Dayjs)
                  }
                  maxTime={
                    index === bracketsStartTimes.length - 1
                      ? (startTime as Dayjs)
                      : getTimeMinusDiff(bracketsStartTimes[index + 1] as Dayjs)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TimeField
                  label="Fin del bracket"
                  value={bracketsStartTimes[index + 1]}
                  onChange={(newTime) =>
                    handleBracketTimeChange(newTime, index + 1)
                  }
                  format="HH:mm"
                  ampm={false}
                  disabled={index === bracketsStartTimes.length - 2}
                  minutesStep={30}
                  minTime={getTimePlusDiff(bracketsStartTimes[index] as Dayjs)}
                  maxTime={
                    index === bracketsStartTimes.length - 1
                      ? (endTime as Dayjs)
                      : (bracketsStartTimes[index + 1] as Dayjs)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Precio adicional"
                  value={prices[index]}
                  onChange={(newValue) => handlePriceChange(newValue, index)}
                />
              </Grid>
            </React.Fragment>
          )
        })}
      <Grid item xs={6}>
        <Button
          variant="contained"
          onClick={addTimeBracket}
          disabled={isMaxBrackets(startTime as Dayjs, endTime as Dayjs)}
        >
          Agregar bracket
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          onClick={removeTimeBracket}
          disabled={bracketsStartTimes.length <= 2}
        >
          Quitar bracket
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!hasMinimumDifference() || areAllZeros()}
          variant="contained"
          onClick={handleUpdateButtonClick}
        >
          Actualizar
        </Button>
      </Grid>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'¿Actualizar el establecimiento?'}
        </DialogTitle>
        <DialogActions>
          <Button
            disabled={updateLoading}
            onClick={handleConfirmationClick}
            autoFocus
          >
            <LoadingWrapper loading={updateLoading}> </LoadingWrapper>
            Sí, actualizar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </DetailsWrapper>
  )
}

export default EstablishmentDetails
