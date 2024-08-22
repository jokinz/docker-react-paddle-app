import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Employee } from '../types/employee'

import { getEmployeeById } from '../api/employees/employee'

import Drawer from '../components/Drawer'
import EmployeeDetails from '../components/Employees/EmployeeDetails'
import LoadingWrapper from '../components/LoadingWrapper'
import { EmployeeContext } from '../contexts/EmployeeContext'

const PageEmployeeSingle = () => {
  const params = useParams<{ employeeId: string }>()

  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState<Employee | null>(null)

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
  }, [])

  return (
    <Drawer>
      <LoadingWrapper loading={loading}>
        {employee !== null ? (
          <EmployeeDetails
            employee={employee}
            updateEmployee={updateEmployee}
          />
        ) : (
          <h1>Trabajador no encontrado</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageEmployeeSingle
