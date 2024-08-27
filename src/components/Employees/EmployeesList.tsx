import { Employee as EmployeeType } from '../../types/employee'

import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { getDataGridProps } from '../../utils'
import Link from '../ResultsStyledLink'

type props = { employees: EmployeeType[] }
const EmployeesList = ({ employees }: props) => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'fullName',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params) => (
        <Link to={`/employees/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'enabled',
      headerName: 'Habilitado',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Rol',
      flex: 1,
    },
  ]
  const rows = employees.map((employee) => {
    return {
      id: employee.id,
      fullName: `${employee.firstName} - ${employee.lastName}`,
      email: employee.email,
      enabled: employee.enabled ? 'Sí' : 'No',
      role: employee.role.roleName,
    }
  })
  const dataGridProps: DataGridProps = getDataGridProps(rows, columns)

  if (employees.length > 0) {
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
      Ningún trabajador para mostrar
    </div>
  )
}

export default EmployeesList
