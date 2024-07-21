import { Grid, GridProps } from '@mui/material'

const DetailsWrapper = ({ children, ...props }: GridProps) => {
  return (
    <Grid
      container
      maxWidth={'48rem'}
      spacing={3}
      {...props}
    >
      {children}
    </Grid>
  )
}

export default DetailsWrapper
