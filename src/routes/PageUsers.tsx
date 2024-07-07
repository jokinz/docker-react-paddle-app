import { useEffect, useState } from 'react'

import { User } from '../types/user'

import { getAllUsers } from '../api/users/user'
import { userExample } from '../api/dummy'

import ButtonLogout from '../components/ButtonLogout'
import ForceLogin from '../components/ForceLogin'
import LoadingWrapper from '../components/LoadingWrapper'
import UpdateUser from '../components/Users/UpdateUser'
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
    <ForceLogin>
      <div>
        Página Usuarios
        <UpdateUser user={userExample} />
        <LoadingWrapper loading={loading}>
          <UsersList users={userList} />
        </LoadingWrapper>
      </div>
      <ButtonLogout />
    </ForceLogin>
  )
}

export default PageUsers
