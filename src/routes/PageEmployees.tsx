import { useEffect, useState } from 'react'

import { Employee } from '../types/employee'

import { getAllEmployees } from '../api/employees/employee'

import LoadingWrapper from '../components/LoadingWrapper'
import EmployeesList from '../components/Employees/EmployeesList'

const PageEmployees = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
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
    <div>
      Página trabajadores
      <LoadingWrapper loading={loading}>
        <EmployeesList employees={employeeList} />
      </LoadingWrapper>
    </div>
  )
}

export default PageEmployees
