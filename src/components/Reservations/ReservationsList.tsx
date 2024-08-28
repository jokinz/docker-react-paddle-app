import { Reservation as ReservationType } from '../../types/reservation'

import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { getDataGridProps } from '../../utils'
import Link from '../ResultsStyledLink'

type props = { reservations: ReservationType[] }

const ReservationsList = ({ reservations }: props) => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'code',
      headerName: 'Código',
      flex: 1,
      renderCell: (params) => (
        <Link to={`/reservations/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'date',
      headerName: 'Fecha',
      flex: 1,
    },
    {
      field: 'time',
      headerName: 'Horario',
      flex: 1,
    },
    {
      field: 'payed',
      headerName: 'Pagado',
      flex: 1,
    },
    {
      field: 'itemsHanded',
      headerName: 'Ítems entregados',
      flex: 1,
    },
  ]
  const rows = reservations.map((reservation) => {
    return {
      id: reservation.id,
      code: reservation.code,
      date: reservation.schedule.date,
      time: `${reservation.schedule.startTime} - ${reservation.schedule.endTime}`,
      payed: reservation.payed ? 'Sí' : 'No',
      itemsHanded: reservation.itemsHanded ? 'Sí' : 'No',
    }
  })
  const dataGridProps: DataGridProps = getDataGridProps(rows, columns)

  if (reservations.length > 0) {
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
      Ninguna reserva para mostrar
    </div>
  )
}

export default ReservationsList
