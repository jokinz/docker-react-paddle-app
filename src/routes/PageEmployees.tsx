import { useContext, useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { Employee } from '../types/employee'

import { getAllEmployees } from '../api/employees/employee'

import Drawer from '../components/Drawer'
import EmployeesList from '../components/Employees/EmployeesList'
import ForceLogin from '../components/ForceLogin'
import LoadingWrapper from '../components/LoadingWrapper'

const PageEmployees = () => {
  const employeeContext = useContext(EmployeeContext)

  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  if (employeeContext?.employee?.role.id !== 3) {
    return <Navigate to="/"/>
  }
  useEffect(() => {
    const getData = async () => {
      const result = await getAllEmployees()
      if (result) {
        setEmployeeList(result)
        setLoading(false)
      } else {
        setEmployeeList([])
        setLoading(false)
      }
    }
    getData()
  }, [])
  return (
    <ForceLogin>
      <Drawer>
        <h1>Página trabajadores</h1>
        <LoadingWrapper loading={loading}>
          <EmployeesList employees={employeeList} />
        </LoadingWrapper>
      </Drawer>
    </ForceLogin>
  )
}

export default PageEmployees
