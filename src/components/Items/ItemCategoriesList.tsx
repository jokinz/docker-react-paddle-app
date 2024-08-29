import { ItemCategory } from '../../types/item'

import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { getDataGridProps } from '../../utils'
import Link from '../ResultsStyledLink'
import { Avatar } from '@mui/material'
import { url } from '../../url'

type props = { categories: ItemCategory[] }
const ItemCategoriesList = ({ categories }: props) => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'icon',
      headerName: '',
      renderCell: (params) => (
        <Avatar src={params.row.icon ? params.row.icon : ''} />
      ),
      display: 'flex',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params) => (
        <Link to={`/${url.api.itemCategories}/${params.row.id}`}>{params.value}</Link>
      ),
    },
  ]
  const rows = categories
  const dataGridProps: DataGridProps = getDataGridProps(rows, columns)

  if (categories.length > 0) {
    return (
      <div>
        <h1>Resultado</h1>
        <DataGrid {...dataGridProps} />
      </div>
    )
  }

  return (
    <div>
      Lista de categorías <br />
      Ninguna categoría para mostrar
    </div>
  )
}

export default ItemCategoriesList
