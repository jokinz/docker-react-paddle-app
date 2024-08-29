import { Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { getDataGridProps } from '../utils'

type SkeletonTableProps = {
  numColumns?: number
  numRows?: number
  showAvatar?: boolean
}

const SkeletonTable = ({
  numColumns = 5,
  numRows = 5,
  showAvatar = false,
}: SkeletonTableProps) => {
  const columns: GridColDef[] = [
    ...(showAvatar
      ? [
          {
            field: 'avatar',
            headerName: '',
            width: 80,
            sortable: false,
            renderCell: () => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Skeleton width={40} height={40} variant="circular" />
              </div>
            ),
          },
        ]
      : []),
    ...Array.from({ length: numColumns }, (_, index) => ({
      field: `field${index}`,
      flex: 1,
      renderHeader: () => <Skeleton width={100} variant="text" />,
      renderCell: () => <Skeleton width={100} variant="text" />,
    })),
  ]

  const rows = Array.from({ length: numRows }, (_, index) => ({ id: index }))

  const dataGridProps: DataGridProps = getDataGridProps(rows, columns)

  return (
    <div>
      <Typography variant="h1">
        <Skeleton />
      </Typography>
      <DataGrid {...dataGridProps} disableColumnSorting hideFooterPagination />
    </div>
  )
}

export default SkeletonTable
