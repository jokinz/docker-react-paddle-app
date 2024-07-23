import { CircularProgress } from '@mui/material'

type props = {
  children: React.ReactNode
  loading: boolean
  skeleton?: React.ReactNode
}

const LoadingWrapper = ({ children, loading, skeleton }: props) => {
  if (loading) {
    if (skeleton) {
      return skeleton
    }
    return <CircularProgress size={24} color="inherit" />
  }
  return children
}

export default LoadingWrapper
