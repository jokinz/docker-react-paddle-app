import { Employee as EmployeeType } from '../../types/employee'

import { Grid, List, Typography, styled } from '@mui/material'

import Employee from './Employee'

type props = { employees: EmployeeType[] }
const EmployeesList = ({ employees }: props) => {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }))

  if (employees.length > 0) {
    return (
      <div>
        EmployeesList comp
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            <List dense={false}>
              {employees.map((employee, index) => (
                <Employee key={index} employee={employee} />
              ))}
            </List>
          </Demo>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      EmployeesList comp <br />
      Ningún trabajador para mostrar
    </div>
  )
}

export default EmployeesList
