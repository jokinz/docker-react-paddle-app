import { useContext } from 'react'
import { EmployeeContext } from '../contexts/EmployeeContext'

const NavigationMenu = () => {
  const user = useContext(EmployeeContext)
  if (!user) {
    return <div>no menu</div>
  }
  if (user) {
    return <div>NavigationMenu comp</div>
  }
}

export default NavigationMenu
