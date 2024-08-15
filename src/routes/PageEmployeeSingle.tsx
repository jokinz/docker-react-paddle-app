import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useCookies } from 'react-cookie'

import { Employee } from '../types/employee'
import { BOHEMIA_PADEL_JWT } from '../types/userCookie'

import { getEmployeeById } from '../api/employees/employee'

import Drawer from '../components/Drawer'
import LoadingWrapper from '../components/LoadingWrapper'
import EmployeeDetails from '../components/Employees/EmployeeDetails'

const PageEmployeeSingle = () => {
  const params = useParams<{ employeeId: string }>()

  const [cookies] = useCookies([BOHEMIA_PADEL_JWT])
  const token = cookies[BOHEMIA_PADEL_JWT].token

  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState<Employee | null>(null)

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployee(updatedEmployee)
  }

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        if (params.employeeId) {
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
