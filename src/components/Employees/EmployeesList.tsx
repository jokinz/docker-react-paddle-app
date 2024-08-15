import { Grid, List } from '@mui/material'

import { Employee as EmployeeType } from '../../types/employee'

import EmployeeItem from './EmployeeItem'

type props = { employees: EmployeeType[] }
const EmployeesList = ({ employees }: props) => {
  if (employees.length > 0) {
    return (
      <div>
        <h1>Resultado</h1>
        <Grid item xs={12} md={6}>
          <List dense={false}>
            {employees.map((employee, index) => (
              <EmployeeItem key={index} employee={employee} />
            ))}
          </List>
        </Grid>
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
