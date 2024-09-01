import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { UpdateEstablishment } from '../types/establishment'

import { getEstablishmentById } from '../api/establishments'

import Drawer from '../components/Drawer'
import EstablishmentDetails from '../components/Establishments/EstablishmentDetails'
import LoadingWrapper from '../components/LoadingWrapper'
import SkeletonDetails from '../components/SkeletonDetails'
import { EmployeeContext } from '../contexts/EmployeeContext'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

const PageEstablishmentSingle = () => {
  const params = useParams<{ establishmentId: string }>()

  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [loading, setLoading] = useState(true)
  const [establishment, setEstablishment] =
    useState<UpdateEstablishment | null>(null)

  useEffect(() => {
    const getEstablishmentData = async () => {
      try {
        if (params.establishmentId && token && token !== '') {
          const establishmentResponse = await getEstablishmentById(
            parseInt(params.establishmentId),
            token
          )
          if (establishmentResponse) {
            setEstablishment(establishmentResponse)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getEstablishmentData()
  }, [])

  return (
    <Drawer>
      <LoadingWrapper loading={loading} skeleton={<SkeletonDetails />}>
        {establishment !== null ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <EstablishmentDetails establishment={establishment} />
          </LocalizationProvider>
        ) : (
          <h1>Establecimiento no encontrado</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageEstablishmentSingle
