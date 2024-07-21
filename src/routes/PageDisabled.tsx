import { Box } from '@mui/material'
import ButtonLogout from '../components/ButtonLogout'
import ForceLogin from '../components/ForceLogin'

const PageDisabled = () => {
  return (
    <ForceLogin>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100vh'}
      >
        <h1>Su usuario está deshabilitado</h1>
        <ButtonLogout />
      </Box>
    </ForceLogin>
  )
}

export default PageDisabled
