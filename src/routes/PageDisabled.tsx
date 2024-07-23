import { Box } from '@mui/material'
import ButtonLogout from '../components/ButtonLogout'

const PageDisabled = () => {
  return (
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
  )
}

export default PageDisabled
