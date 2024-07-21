import Drawer from '../components/Drawer'
import ForceLogin from '../components/ForceLogin'
import MenuLink from '../components/MenuLink'

const PageDashboard = () => {
  return (
    <ForceLogin>
      <Drawer>
        <h1>Página dashboard</h1>
      </Drawer>
    </ForceLogin>
  )
}

export default PageDashboard
