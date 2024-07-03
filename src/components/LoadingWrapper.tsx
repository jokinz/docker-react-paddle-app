const LoadingWrapper = ({
  children,
  loading,
}: {
  children: React.ReactNode
  loading: boolean
}) => {
  if (loading) {
    return <p>Cargando...</p>
  }
  return children
}

export default LoadingWrapper
