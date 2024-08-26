import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Employee, EmployeeRoleResponse } from '../types/employee'

import { getEmployeeById } from '../api/employees/employee'

import Drawer from '../components/Drawer'
import EmployeeDetails from '../components/Employees/EmployeeDetails'
import LoadingWrapper from '../components/LoadingWrapper'
import { EmployeeContext } from '../contexts/EmployeeContext'
import { getAllEmployeeRoles } from '../api/employees/employeeRole'
import { enqueueSnackbar } from 'notistack'

const PageEmployeeSingle = () => {
  const params = useParams<{ employeeId: string }>()

  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [employeeRoles, setEmployeeRoles] = useState<EmployeeRoleResponse[]>([])

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployee(updatedEmployee)
  }

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        if (params.employeeId && token && token !== '') {
          const result = await getEmployeeById(
            parseInt(params.employeeId),
            token
          )
          if (result) {
            setEmployee(result)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getEmployeeData()
    const getEmployeeRoles = async () => {
      if (token) {
        try {
          const response = await getAllEmployeeRoles(token)
          if (response) {
            setEmployeeRoles(response)
          }
        } catch (error) {
          enqueueSnackbar(`Error cargando los roles`, { variant: 'error' })
        }
      }
    }
    getEmployeeRoles()
  }, [])

  return (
    <Drawer>
      <LoadingWrapper loading={loading}>
        {employee !== null ? (
          <EmployeeDetails
            employee={employee}
            updateEmployee={updateEmployee}
            employeeRoles={employeeRoles}
          />
        ) : (
          <h1>Trabajador no encontrado</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageEmployeeSingle
