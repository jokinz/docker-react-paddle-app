import { Grid } from '@mui/material'

const GridTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid textAlign={'center'} item xs={12}>
      <h1>{children}</h1>
    </Grid>
  )
}

export default GridTitle
