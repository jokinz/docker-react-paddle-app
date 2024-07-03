import { useEffect, useState } from 'react'

import { User } from '../types/user'

import { getAllUsers } from '../api/users/user'

import LoadingWrapper from '../components/LoadingWrapper'
import UsersList from '../components/Users/UsersList'

const PageUsers = () => {
  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      const result = await getAllUsers()
      if (result) {
        setUserList(result)
        setLoading(false)
      } else {
        setUserList([])
        setLoading(false)
      }
    }
    getData()
  }, [])
  return (
    <div>
      Página Usuarios
      <LoadingWrapper loading={loading}>
        <UsersList users={userList} />
      </LoadingWrapper>
    </div>
  )
}

export default PageUsers
