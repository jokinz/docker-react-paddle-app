import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const NavigationMenu = () => {
  const user = useContext(UserContext)
  if (!user) {
    return <div>no menu</div>
  }
  if (user) {
    return <div>NavigationMenu comp</div>
  }
}

export default NavigationMenu
