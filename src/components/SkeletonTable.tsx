import Skeleton from '@mui/material/Skeleton'
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { getDataGridProps } from '../utils'
import { Typography } from '@mui/material'

type SkeletonTableProps = {
  numColumns?: number
  numRows?: number
}

const SkeletonTable = ({ numColumns = 5, numRows = 5 }: SkeletonTableProps) => {
  const columns: GridColDef[] = Array.from(
    { length: numColumns },
    (_, index) => ({
      field: `field${index}`,
      flex: 1,
      renderHeader: () => <Skeleton width={100} variant="text" />,
      renderCell: () => <Skeleton width={100} variant="text" />,
    })
  )

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
