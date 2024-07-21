import { CircularProgress } from '@mui/material'

const LoadingWrapper = ({
  children,
  loading,
}: {
  children: React.ReactNode
  loading: boolean
}) => {
  if (loading) {
    return <CircularProgress size={24} color="inherit" />
  }
  return children
}

export default LoadingWrapper
