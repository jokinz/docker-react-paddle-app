import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { PlayingField } from '../types/playingField'

import { getPlayingFieldById } from '../api/playingField'

import Drawer from '../components/Drawer'
import PlayingFieldDetails from '../components/PlayingFields/PlayingFieldDetails'
import LoadingWrapper from '../components/LoadingWrapper'
import { EmployeeContext } from '../contexts/EmployeeContext'
import SkeletonDetails from '../components/SkeletonDetails'

const PagePlayingFieldSingle = () => {
  const params = useParams<{ playingFieldId: string }>()

  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [loading, setLoading] = useState(true)
  const [playingField, setPlayingField] = useState<PlayingField | null>(null)

  const updatePlayingField = (updatedPlayingField: PlayingField) => {
    setPlayingField(updatedPlayingField)
  }

  useEffect(() => {
    const getPlayingFieldData = async () => {
      try {
        if (params.playingFieldId && token && token !== '') {
          const playingFieldResponse = await getPlayingFieldById(
            parseInt(params.playingFieldId),
            token
          )
          if (playingFieldResponse) {
            setPlayingField(playingFieldResponse)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getPlayingFieldData()
  }, [])

  return (
    <Drawer>
      <LoadingWrapper loading={loading} skeleton={<SkeletonDetails />}>
        {playingField !== null ? (
          <PlayingFieldDetails
            playingField={playingField}
            updatePlayingField={updatePlayingField}
          />
        ) : (
          <h1>Campo de juego no encontrado</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PagePlayingFieldSingle
