import ButtonLogout from '../components/ButtonLogout'
import Drawer from '../components/Drawer'

const PageDisabled = () => {
  return (
    <Drawer>
      <h1>Su usuario está deshabilitado</h1>
      <ButtonLogout />
    </Drawer>
  )
}

export default PageDisabled
