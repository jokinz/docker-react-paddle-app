import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { User } from '../types/user'

import { getUserById } from '../api/users/user'

import Drawer from '../components/Drawer'
import LoadingWrapper from '../components/LoadingWrapper'
import UserDetails from '../components/Users/UserDetails'
import { EmployeeContext } from '../contexts/EmployeeContext'
import SkeletonDetails from '../components/SkeletonDetails'

const PageUserSingle = () => {
  const params = useParams<{ userId: string }>()

  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (params.userId && token && token !== '') {
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
      <LoadingWrapper loading={loading} skeleton={<SkeletonDetails />}>
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
