import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useCookies } from 'react-cookie'

import { User } from '../types/user'
import { BOHEMIA_PADEL_JWT } from '../types/userCookie'

import { getUserById } from '../api/users/user'

import Drawer from '../components/Drawer'
import LoadingWrapper from '../components/LoadingWrapper'
import UserDetails from '../components/Users/UserDetails'

const PageUserSingle = () => {
  const params = useParams<{ userId: string }>()

  const [cookies] = useCookies([BOHEMIA_PADEL_JWT])
  const token = cookies[BOHEMIA_PADEL_JWT].token

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (params.userId) {
          const result = await getUserById(parseInt(params.userId), token)
          if (result) {
            setUser(result)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getUserData()
  }, [])
  
  return (
    <Drawer>
      <LoadingWrapper loading={loading}>
        {user !== null ? (
          <UserDetails user={user} updateUser={updateUser} />
        ) : (
          <h1>Usuario no encontrado</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageUserSingle
