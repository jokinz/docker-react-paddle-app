import { PlayingField } from '../../types/playingField'

import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { getDataGridProps } from '../../utils'
import Link from '../ResultsStyledLink'
import { Avatar } from '@mui/material'

type props = { playingFields: PlayingField[] }
const PlayingFieldsList = ({ playingFields }: props) => {
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
        <Link to={`/playing-fields/${params.row.id}`}>{params.value}</Link>
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
  ]
  const rows = playingFields.map((playingField) => {
    return {
      id: playingField.id,
      name: playingField.name,
      price: playingField.price,
      enabled: playingField.enabled ? 'Sí' : 'No',
      thumbnail: playingField.thumbnail,
    }
  })
  const dataGridProps: DataGridProps = getDataGridProps(rows, columns)

  if (playingFields.length > 0) {
    return (
      <div>
        <h1>Resultado</h1>
        <DataGrid {...dataGridProps} />
      </div>
    )
  }

  return (
    <div>
      Lista de playingFields <br />
      Ningún playingField para mostrar
    </div>
  )
}

export default PlayingFieldsList
