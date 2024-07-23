import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

const SkeletonList = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
    </Stack>
  )
}

export default SkeletonList
