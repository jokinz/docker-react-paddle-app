import { Item as ItemType } from '../../types/item'

import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { getDataGridProps } from '../../utils'
import Link from '../ResultsStyledLink'
import { Avatar } from '@mui/material'
import { url } from '../../url'

type props = { items: ItemType[] }
const ItemsList = ({ items }: props) => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'thumbnail',
      headerName: '',
      renderCell: (params) => (
        <Avatar src={params.row.thumbnail ? params.row.thumbnail : ''} />
      ),
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params) => (
        <Link to={`/${url.web.items}/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'price',
      headerName: 'Precio',
      flex: 1,
    },
    {
      field: 'enabled',
      headerName: 'Habilitado',
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Categoría',
      flex: 1,
    },
  ]
  const rows = items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      enabled: item.enabled ? 'Sí' : 'No',
      category: item.itemCategory.name,
      thumbnail: item.thumbnail,
    }
  })
  const dataGridProps: DataGridProps = getDataGridProps(rows, columns)

  if (items.length > 0) {
    return (
      <div>
        <h1>Resultado</h1>
        <DataGrid {...dataGridProps} />
      </div>
    )
  }

  return (
    <div>
      Lista de items <br />
      Ningún item para mostrar
    </div>
  )
}

export default ItemsList
