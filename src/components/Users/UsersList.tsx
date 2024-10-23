import { Avatar } from '@mui/material'

import { User as UserType } from '../../types/user'

import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { getDataGridProps } from '../../utils'
import Link from '../ResultsStyledLink'
import { url } from '../../url'

type props = { users: UserType[] }
const UsersList = ({ users }: props) => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'avatar',
      headerName: '',
      renderCell: (params) => (
        <Avatar src={params.row.avatar ? params.row.avatar : ''} />
      ),
      align: 'center',
    },
    {
      field: 'fullName',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params) => (
        <Link to={`/${url.web.users}/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      flex: 1,
    },
  ]
  const rows = users.map((user) => {
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      avatar: user.profileImage,
    }
  })
  const dataGridProps: DataGridProps = getDataGridProps(rows, columns)

  if (users.length > 0) {
    return (
      <div>
        <h1>Resultado</h1>
        <DataGrid {...dataGridProps} />
      </div>
    )
  }

  return (
    <div>
      <h1>Resultado</h1>
      Ningún usuario para mostrar
    </div>
  )
}

export default UsersList
